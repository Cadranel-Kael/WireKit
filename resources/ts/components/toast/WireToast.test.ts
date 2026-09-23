import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import WireToast from './WireToast'

const TAG = 'wire-toast-test'

beforeAll(() => {
    customElements.define(TAG, WireToast)
    if (!HTMLElement.prototype.getAnimations) {
        HTMLElement.prototype.getAnimations = () => []
    }
})

function makeToast(options: { message?: string; heading?: string; duration?: string } = {}): WireToast {
    const el = document.createElement(TAG) as WireToast

    const alert = document.createElement('div')
    alert.setAttribute('data-wire-alert', '')

    const headingWrapper = document.createElement('div')
    const heading = document.createElement('span')
    heading.setAttribute('data-wire-toast-heading', '')
    headingWrapper.appendChild(heading)
    alert.appendChild(headingWrapper)

    const message = document.createElement('span')
    message.setAttribute('data-wire-toast-message', '')
    alert.appendChild(message)

    const dismiss = document.createElement('button')
    dismiss.setAttribute('data-wire-toast-dismiss', '')
    alert.appendChild(dismiss)

    el.appendChild(alert)

    if (options.message) el.setAttribute('message', options.message)
    if (options.heading) el.setAttribute('heading', options.heading)
    if (options.duration) el.setAttribute('duration', options.duration)

    document.body.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
    vi.useFakeTimers()
})

afterEach(() => {
    vi.useRealTimers()
})

describe('WireToast', () => {
    describe('connectedCallback', () => {
        it('renders the message into the message slot', () => {
            const el = makeToast({ message: 'Saved' })

            expect(el.querySelector('[data-wire-toast-message]')?.textContent).toBe('Saved')
        })

        it('renders the heading into the heading slot', () => {
            const el = makeToast({ message: 'Saved', heading: 'Success' })

            expect(el.querySelector('[data-wire-toast-heading]')?.textContent).toBe('Success')
        })

        it('removes the heading wrapper when no heading is given', () => {
            const el = makeToast({ message: 'Saved' })

            expect(el.querySelector('[data-wire-toast-heading]')).toBeNull()
        })

        it('opens the alert card', () => {
            const el = makeToast({ message: 'Saved' })

            const card = el.querySelector('[data-wire-alert]') as HTMLElement
            expect(card.hasAttribute('open')).toBe(true)
            expect(card.hasAttribute('closing')).toBe(false)
        })

        it('schedules a dismissal when a duration is given', () => {
            const el = makeToast({ message: 'Saved', duration: '1000' })
            const dismissSpy = vi.spyOn(el, 'dismiss')

            vi.advanceTimersByTime(1000)

            expect(dismissSpy).toHaveBeenCalledOnce()
        })

        it('does not schedule a dismissal when no duration is given', () => {
            const el = makeToast({ message: 'Saved' })
            const dismissSpy = vi.spyOn(el, 'dismiss')

            vi.advanceTimersByTime(10000)

            expect(dismissSpy).not.toHaveBeenCalled()
        })
    })

    describe('dismiss()', () => {
        it('marks the card as closing and removes the element', async () => {
            const el = makeToast({ message: 'Saved' })

            const promise = el.dismiss()
            await vi.runAllTimersAsync()
            await promise

            expect(el.isConnected).toBe(false)
        })

        it('dismisses when the dismiss button is clicked', async () => {
            const el = makeToast({ message: 'Saved' })
            const dismiss = el.querySelector('[data-wire-toast-dismiss]') as HTMLElement

            dismiss.click()
            await vi.runAllTimersAsync()

            expect(el.isConnected).toBe(false)
        })
    })

    describe('pause/resume via events', () => {
        it('clears the dismiss timer on pause', () => {
            const el = makeToast({ message: 'Saved', duration: '1000' })
            const dismissSpy = vi.spyOn(el, 'dismiss')

            el.dispatchEvent(new CustomEvent('wire-toast:pause'))
            vi.advanceTimersByTime(2000)

            expect(dismissSpy).not.toHaveBeenCalled()
        })

        it('reschedules the dismiss timer on resume', () => {
            const el = makeToast({ message: 'Saved', duration: '1000' })
            const dismissSpy = vi.spyOn(el, 'dismiss')

            el.dispatchEvent(new CustomEvent('wire-toast:pause'))
            el.dispatchEvent(new CustomEvent('wire-toast:resume'))
            vi.advanceTimersByTime(1000)

            expect(dismissSpy).toHaveBeenCalledOnce()
        })
    })

    describe('attributeChangedCallback', () => {
        it('re-renders the message when the message attribute changes', () => {
            const el = makeToast({ message: 'Saved' })

            el.setAttribute('message', 'Updated')

            expect(el.querySelector('[data-wire-toast-message]')?.textContent).toBe('Updated')
        })

        it('reschedules the dismiss timer when the duration attribute changes', () => {
            const el = makeToast({ message: 'Saved' })
            const dismissSpy = vi.spyOn(el, 'dismiss')

            el.setAttribute('duration', '500')
            vi.advanceTimersByTime(500)

            expect(dismissSpy).toHaveBeenCalledOnce()
        })
    })
})
