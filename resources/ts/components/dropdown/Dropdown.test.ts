import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Dropdown } from './Dropdown'

vi.mock('@floating-ui/dom', () => ({
    computePosition: vi.fn(() => Promise.resolve({ x: 12, y: 34 })),
    flip: vi.fn(),
    offset: vi.fn(),
    shift: vi.fn(),
}))

function dispatchToggle(el: HTMLElement, newState: 'open' | 'closed'): void {
    const event = new Event('toggle', { bubbles: true }) as Event & { newState?: string }
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
        function makeDropdownWithMenu(menuId: string): { el: HTMLElement; trigger: HTMLElement; target: HTMLElement } {
            const el = document.createElement('div')
            el.dataset.wireDropdown = ''

            const trigger = document.createElement('button')
            trigger.setAttribute('popovertarget', menuId)
            el.appendChild(trigger)

            const target = document.createElement('div')
            target.id = menuId
            el.appendChild(target)

            document.body.appendChild(el)
            return { el, trigger, target }
        }

        it('computes and applies position when a popover target opens', async () => {
            const { computePosition } = await import('@floating-ui/dom')
            const { el, trigger, target } = makeDropdownWithMenu('menu-1')
            target.dataset.wirePlacement = 'bottom-end'

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
            const { el, trigger, target } = makeDropdownWithMenu('menu-2')

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
            const { el, target } = makeDropdownWithMenu('menu-3')

            new Dropdown(el)
            dispatchToggle(target, 'closed')
            await Promise.resolve()

            expect(computePosition).not.toHaveBeenCalled()
        })

        it('positions a fresh menu after the old one is swapped out by a morph', async () => {
            // Regression test for #11: when the dropdown has no explicit
            // id/wire:key, Livewire's morph swaps the trigger and menu
            // elements (their ids change every render). The Dropdown
            // instance lives on the stable root, and the delegated toggle
            // listener must catch the fresh menu's toggle event and
            // position it using the fresh trigger.
            const { computePosition } = await import('@floating-ui/dom')
            vi.mocked(computePosition).mockClear()
            const { el, trigger, target } = makeDropdownWithMenu('menu-old')

            new Dropdown(el)

            // Simulate a Livewire morph: both trigger and menu get new ids
            // and the old elements are replaced with fresh ones.
            const oldTrigger = trigger
            const oldTarget = target
            oldTrigger.remove()
            oldTarget.remove()

            const newTrigger = document.createElement('button')
            newTrigger.setAttribute('popovertarget', 'menu-new')
            el.appendChild(newTrigger)

            const newTarget = document.createElement('div')
            newTarget.id = 'menu-new'
            el.appendChild(newTarget)

            dispatchToggle(newTarget, 'open')
            await Promise.resolve()
            await Promise.resolve()

            expect(computePosition).toHaveBeenCalledWith(
                newTrigger,
                newTarget,
                expect.objectContaining({ strategy: 'fixed' }),
            )
            expect(newTarget.style.left).toBe('12px')
            expect(newTarget.style.top).toBe('34px')
        })

        it('stops repositioning after destroy()', async () => {
            const { computePosition } = await import('@floating-ui/dom')
            vi.mocked(computePosition).mockClear()
            const { el, target } = makeDropdownWithMenu('menu-4')

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
