import { beforeEach, describe, expect, it } from 'vitest'
import { Dropdown } from './Dropdown'

function makeDropdownEl(itemCount = 3): { el: HTMLElement; items: HTMLElement[] } {
    const el = document.createElement('div')
    el.dataset.wireDropdown = ''

    const items: HTMLElement[] = []
    for (let i = 0; i < itemCount; i++) {
        const item = document.createElement('button')
        item.dataset.wireMenuItem = ''
        item.id = `item-${i}`
        el.appendChild(item)
        items.push(item)
    }

    document.body.appendChild(el)
    return { el, items }
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Dropdown', () => {
    describe('mouseover', () => {
        it('focuses the hovered menu item', () => {
            const { el, items } = makeDropdownEl()

            new Dropdown(el)
            items[1].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))

            expect(document.activeElement).toBe(items[1])
        })

        it('does nothing when hovering outside any menu item', () => {
            const { el } = makeDropdownEl()
            new Dropdown(el)

            el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))

            expect(document.activeElement).not.toBe(el)
        })
    })

    describe('keyboard navigation', () => {
        it('ArrowDown focuses the next item, wrapping to the first', () => {
            const { el, items } = makeDropdownEl(3)
            new Dropdown(el)
            items[2].focus()

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

            expect(document.activeElement).toBe(items[0])
        })

        it('ArrowUp focuses the previous item, wrapping to the last', () => {
            const { el, items } = makeDropdownEl(3)
            new Dropdown(el)
            items[0].focus()

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))

            expect(document.activeElement).toBe(items[2])
        })

        it('Home focuses the first item', () => {
            const { el, items } = makeDropdownEl(3)
            new Dropdown(el)
            items[1].focus()

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))

            expect(document.activeElement).toBe(items[0])
        })

        it('End focuses the last item', () => {
            const { el, items } = makeDropdownEl(3)
            new Dropdown(el)
            items[0].focus()

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))

            expect(document.activeElement).toBe(items[2])
        })

        it('ignores disabled items', () => {
            const { el, items } = makeDropdownEl(3)
            items[1].setAttribute('aria-disabled', 'true')
            new Dropdown(el)
            items[0].focus()

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

            expect(document.activeElement).toBe(items[2])
        })

        it('does nothing when there are no items', () => {
            const el = document.createElement('div')
            el.dataset.wireDropdown = ''
            document.body.appendChild(el)

            expect(() => {
                new Dropdown(el)
                el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
            }).not.toThrow()
        })

        it('opens a submenu on ArrowRight when the active item targets one', () => {
            const { el, items } = makeDropdownEl(1)
            const submenu = document.createElement('div')
            submenu.id = 'sub-1'
            submenu.showPopover = () => {}
            const subItem = document.createElement('button')
            subItem.dataset.wireMenuItem = ''
            submenu.appendChild(subItem)
            document.body.appendChild(submenu)

            items[0].dataset.wireSubmenuTarget = 'sub-1'
            new Dropdown(el)
            items[0].focus()

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

            expect(document.activeElement).toBe(subItem)
        })

        it('ArrowRight does nothing when the active item has no submenu target', () => {
            const { el, items } = makeDropdownEl(1)
            new Dropdown(el)
            items[0].focus()

            expect(() => {
                el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
            }).not.toThrow()
            expect(document.activeElement).toBe(items[0])
        })
    })

    describe('destroy()', () => {
        it('stops reacting to keydown after being destroyed', () => {
            const { el, items } = makeDropdownEl(3)
            const dropdown = new Dropdown(el)
            items[0].focus()

            dropdown.destroy()
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

            expect(document.activeElement).toBe(items[0])
        })
    })
})
