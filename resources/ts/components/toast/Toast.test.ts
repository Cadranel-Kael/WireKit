import { beforeEach, describe, expect, it, vi } from 'vitest'
import Toast from './Toast'

function mockLivewire() {
    const handlers: Record<string, ((payload: any) => void)[]> = {}
    ;(globalThis as any).Livewire = {
        on: vi.fn((event: string, handler: (payload: any) => void) => {
            handlers[event] = handlers[event] ?? []
            handlers[event].push(handler)
        }),
    }
    return {
        emit: (event: string, payload: any) => {
            handlers[event]?.forEach((h) => h(payload))
        },
    }
}

function makeToastRoot(): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireToast = ''
    el.dataset.wireMax = '3'
    el.showPopover = vi.fn()
    el.matches = ((selector: string) =>
        selector === ':popover-open' ? false : Element.prototype.matches.call(el, selector)) as any

    const template = document.createElement('template')
    template.setAttribute('data-wire-toast-template', '')
    template.innerHTML = '<wire-toast></wire-toast>'
    el.appendChild(template)

    document.body.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
    delete (globalThis as any).Livewire
})

describe('Toast', () => {
    it('registers a toast:show listener with Livewire on construction', () => {
        const livewire = mockLivewire()
        makeToastRoot()

        new Toast(makeToastRoot())

        expect(livewire.emit).toBeDefined()
        expect((globalThis as any).Livewire.on).toHaveBeenCalledWith('toast:show', expect.any(Function))
    })

    describe('show()', () => {
        it('clones the template and appends it with the message and duration set', () => {
            mockLivewire()
            const el = makeToastRoot()
            const toast = new Toast(el)

            toast.show('Saved successfully', undefined, 4000)

            const rendered = el.querySelector('wire-toast') as HTMLElement
            expect(rendered).not.toBeNull()
            expect(rendered.getAttribute('message')).toBe('Saved successfully')
            expect(rendered.getAttribute('duration')).toBe('4000')
        })

        it('sets the heading attribute when a heading is given', () => {
            mockLivewire()
            const el = makeToastRoot()
            const toast = new Toast(el)

            toast.show('Message', 'Heading')

            const rendered = el.querySelector('wire-toast') as HTMLElement
            expect(rendered.getAttribute('heading')).toBe('Heading')
        })

        it('does not set a heading attribute when none is given', () => {
            mockLivewire()
            const el = makeToastRoot()
            const toast = new Toast(el)

            toast.show('Message')

            const rendered = el.querySelector('wire-toast') as HTMLElement
            expect(rendered.hasAttribute('heading')).toBe(false)
        })

        it('sets the variant attribute when a variant is given', () => {
            mockLivewire()
            const el = makeToastRoot()
            const toast = new Toast(el)

            toast.show('Message', undefined, undefined, 'success')

            const rendered = el.querySelector('wire-toast') as HTMLElement
            expect(rendered.getAttribute('variant')).toBe('success')
        })

        it('opens the popover when not already open', () => {
            mockLivewire()
            const el = makeToastRoot()
            const toast = new Toast(el)

            toast.show('Message')

            expect(el.showPopover).toHaveBeenCalledOnce()
        })

        it('does nothing when there is no template', () => {
            mockLivewire()
            const el = document.createElement('div')
            el.dataset.wireToast = ''
            el.dataset.wireMax = '3'
            document.body.appendChild(el)
            const toast = new Toast(el)

            expect(() => toast.show('Message')).not.toThrow()
            expect(el.querySelector('wire-toast')).toBeNull()
        })
    })

    describe('toast:show Livewire event', () => {
        it('renders a toast when the event fires', () => {
            const livewire = mockLivewire()
            const el = makeToastRoot()
            new Toast(el)

            livewire.emit('toast:show', { message: 'From event', heading: null, duration: null, variant: null })

            const rendered = el.querySelector('wire-toast') as HTMLElement
            expect(rendered.getAttribute('message')).toBe('From event')
        })
    })
})
