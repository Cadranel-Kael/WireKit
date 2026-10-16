import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Modal, MODAL_INSTANCE_KEY } from './Modal'
import { initModals } from './initModals'

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

function makeModalEl(name: string, container: HTMLElement = document.body): HTMLDialogElement {
    const el = document.createElement('dialog')
    el.id = name
    el.dataset.wireModal = ''
    container.appendChild(el)
    return el
}

function makeTrigger(name: string, container: HTMLElement = document.body): HTMLButtonElement {
    const btn = document.createElement('button')
    btn.dataset.wireModalTrigger = name
    container.appendChild(btn)
    return btn
}

let livewire: ReturnType<typeof makeLivewireStub>

beforeEach(() => {
    document.body.innerHTML = ''
    polyfillGetAnimations()
    livewire = makeLivewireStub()
    ;(globalThis as unknown as { Livewire: typeof livewire }).Livewire = livewire
})

describe('initModals()', () => {
    it('returns an empty array when no modals are on the page', () => {
        expect(initModals()).toEqual([])
    })

    it('returns one Modal per [data-wire-modal] element', () => {
        makeModalEl('a')
        makeModalEl('b')

        const result = initModals()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(Modal)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeModalEl('inside', root)
        makeModalEl('outside')

        expect(initModals(root)).toHaveLength(1)
    })

    it('registers a Livewire modal:show listener that opens the named modal', () => {
        const el = makeModalEl('confirm-delete')
        initModals()

        livewire.trigger('modal:show', { name: 'confirm-delete' })

        expect(el.hasAttribute('open')).toBe(true)
    })

    it('registers a Livewire modal:close listener that closes the named modal', () => {
        const el = makeModalEl('confirm-delete')
        initModals()
        el.showModal()

        livewire.trigger('modal:close', { name: 'confirm-delete' })

        expect(el.hasAttribute('open')).toBe(false)
    })

    it('does not throw when modal:show targets an id that does not exist', () => {
        initModals()

        expect(() => livewire.trigger('modal:show', { name: 'missing' })).not.toThrow()
    })

    it('stores the Modal instance on the dialog element', () => {
        const el = makeModalEl('confirm-delete')

        const [modal] = initModals()

        expect((el as unknown as Record<string, Modal>)[MODAL_INSTANCE_KEY]).toBe(modal)
    })

    it('initializes a dialog that is the root element itself', () => {
        const el = makeModalEl('confirm-delete')

        expect(initModals(el)).toHaveLength(1)
    })

    it('does not construct a second Modal when re-run on the same root', () => {
        makeModalEl('a')
        makeModalEl('b')

        expect(initModals()).toHaveLength(2)
        expect(initModals()).toEqual([])
    })

    it('registers the Livewire listeners only once across repeated runs', () => {
        initModals()
        initModals()
        initModals()

        // modal:show + modal:close, and no more
        expect(livewire.on).toHaveBeenCalledTimes(2)
    })
})

describe('initModals() across Livewire morphs', () => {
    it('wires up a dialog a morph adds mid-session', () => {
        initModals()

        // A morph drops a whole subtree in: dialog and trigger both new.
        const subtree = document.createElement('div')
        const el = makeModalEl('picker', subtree)
        const trigger = makeTrigger('picker', subtree)
        document.body.appendChild(subtree)

        // What the morph.added hook does with the added node.
        initModals(subtree)

        trigger.click()

        expect(el.hasAttribute('open')).toBe(true)
    })

    it('wires up a dialog a morph replaces mid-session', () => {
        const el = makeModalEl('picker')
        const trigger = makeTrigger('picker')
        initModals()

        // A morph swaps the subtree carrying the dialog: the old node is
        // gone, a fresh <dialog> with the same id takes its place.
        el.remove()
        const replacement = makeModalEl('picker')
        initModals()

        trigger.click()

        expect(replacement.hasAttribute('open')).toBe(true)
        expect(el.hasAttribute('open')).toBe(false)
    })

    it('keeps a replaced trigger working when the dialog survives the morph', () => {
        const el = makeModalEl('picker')
        const oldTrigger = makeTrigger('picker')
        initModals()

        // The tree repro from #6: the whole subtree holding the trigger is
        // swapped, the dialog lives outside it.
        oldTrigger.remove()
        const newTrigger = makeTrigger('picker')

        newTrigger.click()

        expect(el.hasAttribute('open')).toBe(true)
    })

    it('does not double-bind a dialog when init runs again over a morph-added ancestor', () => {
        const el = makeModalEl('picker')
        const trigger = makeTrigger('picker')
        initModals()

        // morph.added can fire for nested added nodes; re-running init over
        // an ancestor of an initialized dialog must be a no-op.
        expect(initModals(document.body)).toEqual([])

        trigger.click()

        expect(el.hasAttribute('open')).toBe(true)
    })
})
