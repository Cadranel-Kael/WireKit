import { beforeEach, describe, expect, it, vi } from 'vitest'
import Toast from './Toast'
import initToasts from './initToasts'

function makeToastRootEl(container: HTMLElement = document.body): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireToast = ''
    el.dataset.wireMax = '3'
    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
    ;(globalThis as any).Livewire = { on: vi.fn() }
})

describe('initToasts()', () => {
    it('returns an empty array when no toast roots are on the page', () => {
        expect(initToasts()).toEqual([])
    })

    it('returns one Toast per [data-wire-toast] element', () => {
        makeToastRootEl()
        makeToastRootEl()

        const result = initToasts()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(Toast)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeToastRootEl(root)
        makeToastRootEl()

        expect(initToasts(root)).toHaveLength(1)
    })
})
