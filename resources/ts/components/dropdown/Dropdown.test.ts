import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Dropdown } from './Dropdown'

vi.mock('@floating-ui/dom', () => ({
    computePosition: vi.fn(() => Promise.resolve({ x: 12, y: 34 })),
    flip: vi.fn(),
    offset: vi.fn(),
    shift: vi.fn(),
}))

function dispatchToggle(el: HTMLElement, newState: 'open' | 'closed'): void {
    const event = new Event('toggle') as Event & { newState?: string }
    event.newState = newState
    el.dispatchEvent(event)
}

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

    describe('positioning', () => {
        it('computes and applies position when a popover target opens', async () => {
            const { computePosition } = await import('@floating-ui/dom')
            const { el } = makeDropdownEl(0)

            const trigger = document.createElement('button')
            trigger.setAttribute('popovertarget', 'menu-1')
            el.appendChild(trigger)

            const target = document.createElement('div')
            target.id = 'menu-1'
            target.dataset.wirePlacement = 'bottom-end'
            document.body.appendChild(target)

            new Dropdown(el)
            dispatchToggle(target, 'open')
            await Promise.resolve()
            await Promise.resolve()

            expect(computePosition).toHaveBeenCalledWith(
                trigger,
                target,
                expect.objectContaining({ strategy: 'fixed', placement: 'bottom-end' }),
            )
            expect(target.style.left).toBe('12px')
            expect(target.style.top).toBe('34px')
        })

        it('defaults to bottom-start when no placement is set', async () => {
            const { computePosition } = await import('@floating-ui/dom')
            const { el } = makeDropdownEl(0)

            const trigger = document.createElement('button')
            trigger.setAttribute('popovertarget', 'menu-2')
            el.appendChild(trigger)

            const target = document.createElement('div')
            target.id = 'menu-2'
            document.body.appendChild(target)

            new Dropdown(el)
            dispatchToggle(target, 'open')
            await Promise.resolve()

            expect(computePosition).toHaveBeenCalledWith(
                trigger,
                target,
                expect.objectContaining({ placement: 'bottom-start' }),
            )
        })

        it('does nothing when the popover closes', async () => {
            const { computePosition } = await import('@floating-ui/dom')
            vi.mocked(computePosition).mockClear()
            const { el } = makeDropdownEl(0)

            const trigger = document.createElement('button')
            trigger.setAttribute('popovertarget', 'menu-3')
            el.appendChild(trigger)

            const target = document.createElement('div')
            target.id = 'menu-3'
            document.body.appendChild(target)

            new Dropdown(el)
            dispatchToggle(target, 'closed')
            await Promise.resolve()

            expect(computePosition).not.toHaveBeenCalled()
        })

        it('stops repositioning after destroy()', async () => {
            const { computePosition } = await import('@floating-ui/dom')
            vi.mocked(computePosition).mockClear()
            const { el } = makeDropdownEl(0)

            const trigger = document.createElement('button')
            trigger.setAttribute('popovertarget', 'menu-4')
            el.appendChild(trigger)

            const target = document.createElement('div')
            target.id = 'menu-4'
            document.body.appendChild(target)

            const dropdown = new Dropdown(el)
            dropdown.destroy()
            dispatchToggle(target, 'open')
            await Promise.resolve()

            expect(computePosition).not.toHaveBeenCalled()
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
