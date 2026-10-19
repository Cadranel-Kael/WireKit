import { beforeEach, describe, expect, it } from 'vitest'
import { Dropdown } from './Dropdown'
import { getDropdown, initDropdowns } from './initDropdowns'

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

    it('initialises a root that itself matches the selector', () => {
        const el = makeDropdownEl()

        const result = initDropdowns(el)

        expect(result).toHaveLength(1)
        expect(result[0]).toBeInstanceOf(Dropdown)
    })

    it('does not create duplicate instances when called again on the same elements', () => {
        const el = makeDropdownEl()

        const first = initDropdowns()
        const second = initDropdowns()

        expect(first).toHaveLength(1)
        expect(second).toHaveLength(0)
        expect(getDropdown(el)).toBe(first[0])
    })

    it('does not stack listeners on re-init (keydown fires once)', () => {
        const el = makeDropdownEl()
        const item = document.createElement('button')
        item.dataset.wireMenuItem = ''
        el.appendChild(item)

        initDropdowns()
        initDropdowns()
        initDropdowns()

        // With stacked keydown listeners, ArrowDown would step twice per
        // keypress (the issue mentions arrow keys double-stepping as the
        // symptom of a naive re-init without a guard).
        const item2 = document.createElement('button')
        item2.dataset.wireMenuItem = ''
        el.appendChild(item2)

        item.focus()
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

        expect(document.activeElement).toBe(item2)
    })

    it('marks initialised elements with a data attribute', () => {
        const el = makeDropdownEl()

        initDropdowns()

        expect(el.hasAttribute('data-wire-dropdown-initialized')).toBe(true)
    })
})

describe('getDropdown()', () => {
    it('returns the instance for an initialised element', () => {
        const el = makeDropdownEl()
        const [dropdown] = initDropdowns()

        expect(getDropdown(el)).toBe(dropdown)
    })

    it('returns undefined for an element that has not been initialised', () => {
        const el = makeDropdownEl()

        expect(getDropdown(el)).toBeUndefined()
    })
})
