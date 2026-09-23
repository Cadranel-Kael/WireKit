import { beforeEach, describe, expect, it } from 'vitest'
import { Dropdown } from './Dropdown'
import { initDropdowns } from './initDropdowns'

function makeDropdownEl(container: HTMLElement = document.body): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireDropdown = ''
    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initDropdowns()', () => {
    it('returns an empty array when no dropdowns are on the page', () => {
        expect(initDropdowns()).toEqual([])
    })

    it('returns one Dropdown per [data-wire-dropdown] element', () => {
        makeDropdownEl()
        makeDropdownEl()

        const result = initDropdowns()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(Dropdown)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeDropdownEl(root)
        makeDropdownEl()

        const result = initDropdowns(root)

        expect(result).toHaveLength(1)
    })

    it('defaults to document as root', () => {
        makeDropdownEl()

        expect(initDropdowns(document)).toHaveLength(1)
    })
})
