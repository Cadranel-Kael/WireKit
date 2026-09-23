import { beforeEach, describe, expect, it } from 'vitest'
import { Resizable } from './Resizable'
import { initResizables } from './initResizables'

function makeResizableEl(container: HTMLElement = document.body): HTMLElement {
    const root = document.createElement('div')
    root.dataset.wireResizable = ''
    container.appendChild(root)
    return root
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initResizables()', () => {
    it('returns an empty array when no resizable groups are on the page', () => {
        const result = initResizables()

        expect(result).toEqual([])
    })

    it('returns one Resizable per [data-wire-resizable] element', () => {
        makeResizableEl()
        makeResizableEl()

        const result = initResizables()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(Resizable)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeResizableEl(root)
        makeResizableEl()

        const result = initResizables(root)

        expect(result).toHaveLength(1)
    })

    it('defaults to document as root', () => {
        makeResizableEl()

        const result = initResizables(document)

        expect(result).toHaveLength(1)
    })
})
