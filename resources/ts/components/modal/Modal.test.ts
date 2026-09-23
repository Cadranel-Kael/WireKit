import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'

/**
 * happy-dom does not implement HTMLElement.getAnimations(), which Modal's
 * MutationObserver callback calls whenever the dialog's `open` attribute
 * changes (e.g. via showModal()/close()). Polyfill it so those async
 * callbacks don't throw an unhandled rejection during tests.
 */
function polyfillGetAnimations() {
    ;(HTMLElement.prototype as unknown as { getAnimations: () => Animation[] }).getAnimations = () => []
}

function makeLivewireStub() {
    const handlers = new Map<string, (...args: unknown[]) => void>()
    return {
        on: vi.fn((event: string, cb: (...args: unknown[]) => void) => handlers.set(event, cb)),
        dispatch: vi.fn(),
        trigger: (event: string, ...args: unknown[]) => handlers.get(event)?.(...args),
    }
}

function makeModalEl(name = 'confirm-delete'): HTMLDialogElement {
    const el = document.createElement('dialog')
    el.id = name
    document.body.appendChild(el)
    return el
}

function makeTrigger(name: string): HTMLButtonElement {
    const btn = document.createElement('button')
    btn.dataset.wireModalTrigger = name
    document.body.appendChild(btn)
    return btn
}

function makeCloseButton(name: string): HTMLButtonElement {
    const btn = document.createElement('button')
    btn.dataset.wireModalClose = name
    document.body.appendChild(btn)
    return btn
}

let livewire: ReturnType<typeof makeLivewireStub>

beforeEach(() => {
    document.body.innerHTML = ''
    polyfillGetAnimations()
    livewire = makeLivewireStub()
    ;(globalThis as unknown as { Livewire: typeof livewire }).Livewire = livewire
})

describe('Modal', () => {
    describe('triggers', () => {
        it('opens the dialog when a matching trigger is clicked', () => {
            const el = makeModalEl('confirm-delete')
            const trigger = makeTrigger('confirm-delete')
            new Modal(el)

            trigger.click()

            expect(el.hasAttribute('open')).toBe(true)
        })

        it('ignores triggers for a different modal', () => {
            const el = makeModalEl('confirm-delete')
            const otherTrigger = makeTrigger('other-modal')
            new Modal(el)

            otherTrigger.click()

            expect(el.hasAttribute('open')).toBe(false)
        })
    })

    describe('close buttons', () => {
        it('closes the dialog when a matching close button is clicked', () => {
            const el = makeModalEl('confirm-delete')
            const closeBtn = makeCloseButton('confirm-delete')
            new Modal(el)
            el.showModal()

            closeBtn.click()

            expect(el.hasAttribute('open')).toBe(false)
        })
    })

    describe('light dismiss', () => {
        it('dismisses when clicking the dialog backdrop itself', () => {
            const el = makeModalEl('confirm-delete')
            new Modal(el)
            el.showModal()

            el.dispatchEvent(new MouseEvent('click', { bubbles: true }))

            expect(el.hasAttribute('open')).toBe(false)
        })

        it('does not dismiss when clicking content inside the dialog', () => {
            const el = makeModalEl('confirm-delete')
            const content = document.createElement('p')
            el.appendChild(content)
            new Modal(el)
            el.showModal()

            content.dispatchEvent(new MouseEvent('click', { bubbles: true }))

            expect(el.hasAttribute('open')).toBe(true)
        })
    })

    describe('modal:close-all', () => {
        it('closes the dialog when the Livewire event fires', () => {
            const el = makeModalEl('confirm-delete')
            new Modal(el)
            el.showModal()

            livewire.trigger('modal:close-all')

            expect(el.hasAttribute('open')).toBe(false)
        })
    })

    describe('destroy()', () => {
        it('stops reacting to trigger clicks after being destroyed', () => {
            // destroy() strips listeners via the cloneNode+replaceWith trick, which swaps in a
            // new element — so we must re-query the live (post-destroy) node, not the original
            // reference, to observe what a real click in the page would do.
            const el = makeModalEl('confirm-delete')
            makeTrigger('confirm-delete')
            const modal = new Modal(el)

            modal.destroy()
            const liveTrigger = document.querySelector<HTMLButtonElement>('[data-wire-modal-trigger="confirm-delete"]')!
            liveTrigger.click()

            expect(el.hasAttribute('open')).toBe(false)
        })

        it('stops reacting to close button clicks after being destroyed', () => {
            const el = makeModalEl('confirm-delete')
            makeCloseButton('confirm-delete')
            const modal = new Modal(el)
            el.showModal()

            modal.destroy()
            const liveCloseBtn = document.querySelector<HTMLButtonElement>('[data-wire-modal-close="confirm-delete"]')!
            liveCloseBtn.click()

            expect(el.hasAttribute('open')).toBe(true)
        })

        it('stops light-dismissing after being destroyed', () => {
            const el = makeModalEl('confirm-delete')
            const modal = new Modal(el)
            el.showModal()

            modal.destroy()
            el.dispatchEvent(new MouseEvent('click', { bubbles: true }))

            expect(el.hasAttribute('open')).toBe(true)
        })

        it('does not throw', () => {
            const el = makeModalEl('confirm-delete')
            const modal = new Modal(el)

            expect(() => modal.destroy()).not.toThrow()
        })
    })
})
