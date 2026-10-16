import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Modal, MODAL_INSTANCE_KEY } from './Modal'

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
        // Livewire.on() returns an unsubscribe function.
        on: vi.fn((event: string, cb: (...args: unknown[]) => void) => {
            handlers.set(event, cb)
            return () => handlers.delete(event)
        }),
        dispatch: vi.fn(),
        trigger: (event: string, ...args: unknown[]) => handlers.get(event)?.(...args),
    }
}

function makeModalEl(name = 'confirm-delete', container: HTMLElement = document.body): HTMLDialogElement {
    const el = document.createElement('dialog')
    el.id = name
    container.appendChild(el)
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

        it('opens the dialog when a trigger is added after construction', () => {
            const el = makeModalEl('confirm-delete')
            new Modal(el)

            // A Livewire morph can drop a new trigger into the page at any
            // time; it must work without re-running init.
            const trigger = makeTrigger('confirm-delete')
            trigger.click()

            expect(el.hasAttribute('open')).toBe(true)
        })

        it('opens the dialog when the click lands on a child of the trigger', () => {
            const el = makeModalEl('confirm-delete')
            const trigger = makeTrigger('confirm-delete')
            const icon = document.createElement('span')
            trigger.appendChild(icon)
            new Modal(el)

            icon.click()

            expect(el.hasAttribute('open')).toBe(true)
        })

        it('does not call showModal() again when the dialog is already open', () => {
            const el = makeModalEl('confirm-delete')
            const trigger = makeTrigger('confirm-delete')
            new Modal(el)
            el.showModal()
            const spy = vi.spyOn(el, 'showModal')

            // A second showModal() on an open dialog throws InvalidStateError
            // in browsers.
            expect(() => trigger.click()).not.toThrow()
            expect(spy).not.toHaveBeenCalled()
            expect(el.hasAttribute('open')).toBe(true)
        })

        it('does not throw when a stale and a fresh instance share the same dialog', () => {
            const el = makeModalEl('confirm-delete')
            const trigger = makeTrigger('confirm-delete')
            new Modal(el)
            // A stale instance whose node was re-attached matches the same
            // trigger id, so both delegated handlers fire on one click.
            new Modal(el)
            const spy = vi.spyOn(el, 'showModal')

            expect(() => trigger.click()).not.toThrow()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(el.hasAttribute('open')).toBe(true)
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

        it('closes the dialog when a close button is added after construction', () => {
            const el = makeModalEl('confirm-delete')
            new Modal(el)
            el.showModal()

            const closeBtn = makeCloseButton('confirm-delete')
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

    describe('dialog removal', () => {
        it('stops reacting to trigger clicks once the dialog is removed from the DOM', async () => {
            const el = makeModalEl('confirm-delete')
            const trigger = makeTrigger('confirm-delete')
            new Modal(el)

            el.remove()
            await new Promise((resolve) => setTimeout(resolve, 0))

            trigger.click()

            expect(el.hasAttribute('open')).toBe(false)
        })

        it('is destroyed when an ancestor deep in the page is removed', async () => {
            const wrapper = document.createElement('div')
            document.body.appendChild(wrapper)
            const el = makeModalEl('confirm-delete', wrapper)
            const trigger = makeTrigger('confirm-delete')
            new Modal(el)

            wrapper.remove()
            await new Promise((resolve) => setTimeout(resolve, 0))

            // destroy() ran: the stored instance is gone, so the document
            // click listener and modal:close-all subscription are dropped
            // too (the click below stays dead via the isConnected guard
            // either way -- the leak is what this assertion catches).
            expect((el as unknown as Record<string, unknown>)[MODAL_INSTANCE_KEY]).toBeUndefined()

            trigger.click()

            expect(el.hasAttribute('open')).toBe(false)
        })

        it('is not destroyed when the dialog is moved to another parent', async () => {
            const el = makeModalEl('confirm-delete')
            const trigger = makeTrigger('confirm-delete')
            new Modal(el)
            const elsewhere = document.createElement('div')
            document.body.appendChild(elsewhere)

            // A move is a removal and an insertion in the same mutation batch.
            elsewhere.appendChild(el)
            await new Promise((resolve) => setTimeout(resolve, 0))

            trigger.click()

            expect(el.hasAttribute('open')).toBe(true)
        })
    })

    describe('instance storage', () => {
        it('stores the instance on the dialog element so init can find it', () => {
            const el = makeModalEl('confirm-delete')

            const modal = new Modal(el)

            expect((el as unknown as Record<string, Modal>)[MODAL_INSTANCE_KEY]).toBe(modal)
        })

        it('clears the stored instance on destroy()', () => {
            const el = makeModalEl('confirm-delete')
            const modal = new Modal(el)

            modal.destroy()

            expect((el as unknown as Record<string, Modal>)[MODAL_INSTANCE_KEY]).toBeUndefined()
        })
    })

    describe('destroy()', () => {
        it('stops reacting to trigger clicks after being destroyed', () => {
            const el = makeModalEl('confirm-delete')
            const trigger = makeTrigger('confirm-delete')
            const modal = new Modal(el)

            modal.destroy()
            trigger.click()

            expect(el.hasAttribute('open')).toBe(false)
        })

        it('stops reacting to close button clicks after being destroyed', () => {
            const el = makeModalEl('confirm-delete')
            const closeBtn = makeCloseButton('confirm-delete')
            const modal = new Modal(el)
            el.showModal()

            modal.destroy()
            closeBtn.click()

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

        it('unsubscribes from modal:close-all', () => {
            const el = makeModalEl('confirm-delete')
            const modal = new Modal(el)
            el.showModal()

            modal.destroy()
            livewire.trigger('modal:close-all')

            expect(el.hasAttribute('open')).toBe(true)
        })

        it('does not throw', () => {
            const el = makeModalEl('confirm-delete')
            const modal = new Modal(el)

            expect(() => modal.destroy()).not.toThrow()
        })
    })
})
