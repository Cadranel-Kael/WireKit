import { beforeEach, describe, expect, it } from 'vitest'
import { InlineEdit } from './InlineEdit'
import { initInlineEdit } from './initInlineEdit'

function makeInlineEditEl(container: HTMLElement = document.body): HTMLElement {
    const el = document.createElement('span')
    el.dataset.wireInlineEdit = ''

    const display = document.createElement('span')
    display.dataset.wireInlineEditDisplay = ''
    el.appendChild(display)

    const input = document.createElement('input')
    input.dataset.wireInlineEditInput = ''
    input.hidden = true
    el.appendChild(input)

    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initInlineEdit()', () => {
    it('returns an empty array when no inline-edit elements are on the page', () => {
        expect(initInlineEdit()).toEqual([])
    })

    it('returns one InlineEdit per [data-wire-inline-edit] element', () => {
        makeInlineEditEl()
        makeInlineEditEl()

        const result = initInlineEdit()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(InlineEdit)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeInlineEditEl(root)
        makeInlineEditEl()

        const result = initInlineEdit(root)

        expect(result).toHaveLength(1)
    })

    it('initialises the root itself when it is the matching element, not just its descendants (morph.added can hand us either)', () => {
        const el = makeInlineEditEl()

        const result = initInlineEdit(el)

        expect(result).toHaveLength(1)
    })

    it('does not construct a second instance for an element already initialised', () => {
        makeInlineEditEl()

        initInlineEdit()
        const second = initInlineEdit()

        expect(second).toHaveLength(0)
    })
})
