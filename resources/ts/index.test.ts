import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import './index'

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
    const hooks = new Map<string, (payload: never) => void>()
    return {
        // Livewire.on() returns an unsubscribe function.
        on: vi.fn((event: string, cb: (...args: unknown[]) => void) => {
            handlers.set(event, cb)
            return () => handlers.delete(event)
        }),
        dispatch: vi.fn(),
        hook: vi.fn((name: string, cb: (payload: never) => void) => hooks.set(name, cb)),
        trigger: (event: string, ...args: unknown[]) => handlers.get(event)?.(...args),
        fireHook: (name: string, payload: never) => hooks.get(name)?.(payload),
    }
}

const livewire = makeLivewireStub()
;(globalThis as unknown as { Livewire: typeof livewire }).Livewire = livewire

// Fired once: index.ts defines custom elements in its livewire:init
// handler, and registering the same tag name twice throws.
beforeAll(() => {
    document.dispatchEvent(new Event('livewire:init'))
})

beforeEach(() => {
    document.body.innerHTML = ''
    polyfillGetAnimations()
})

function makeModalSubtree(name: string): { subtree: HTMLElement; dialog: HTMLDialogElement; trigger: HTMLButtonElement } {
    const subtree = document.createElement('div')
    const dialog = document.createElement('dialog')
    dialog.id = name
    dialog.dataset.wireModal = ''
    const trigger = document.createElement('button')
    trigger.dataset.wireModalTrigger = name
    subtree.append(dialog, trigger)
    document.body.appendChild(subtree)
    return { subtree, dialog, trigger }
}

describe('morph.added hook', () => {
    it('initializes a modal inside a subtree a morph adds mid-session', () => {
        const { subtree, dialog, trigger } = makeModalSubtree('picker')

        livewire.fireHook('morph.added', { el: subtree } as never)

        trigger.click()

        expect(dialog.hasAttribute('open')).toBe(true)
    })

    it('initializes a dialog that is itself the morph-added node', () => {
        const { dialog, trigger } = makeModalSubtree('picker')
        dialog.remove()
        trigger.remove()
        document.body.appendChild(dialog)

        livewire.fireHook('morph.added', { el: dialog } as never)

        document.body.appendChild(trigger)
        trigger.click()

        expect(dialog.hasAttribute('open')).toBe(true)
    })

    it('re-initializes a dialog a morph replaced mid-session', () => {
        const { dialog, trigger } = makeModalSubtree('picker')
        document.dispatchEvent(new Event('livewire:navigated'))

        // The morph swaps the subtree carrying the dialog: the old node is
        // gone, a fresh <dialog> with the same id takes its place.
        dialog.remove()
        const replacement = document.createElement('dialog')
        replacement.id = 'picker'
        replacement.dataset.wireModal = ''
        document.body.appendChild(replacement)

        livewire.fireHook('morph.added', { el: replacement } as never)

        trigger.click()

        expect(replacement.hasAttribute('open')).toBe(true)
        expect(dialog.hasAttribute('open')).toBe(false)
    })

    it('keeps a morph-replaced trigger working when the dialog survives', () => {
        const { dialog, trigger } = makeModalSubtree('picker')
        document.dispatchEvent(new Event('livewire:navigated'))

        // The tree repro from #6: the subtree holding the trigger is
        // swapped, the dialog lives outside it.
        trigger.remove()
        const newTrigger = document.createElement('button')
        newTrigger.dataset.wireModalTrigger = 'picker'
        document.body.appendChild(newTrigger)

        livewire.fireHook('morph.added', { el: newTrigger } as never)

        newTrigger.click()

        expect(dialog.hasAttribute('open')).toBe(true)
    })
})
