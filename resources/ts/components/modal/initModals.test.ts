import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'
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
})
