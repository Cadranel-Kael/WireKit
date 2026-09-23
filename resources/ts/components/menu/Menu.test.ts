import { beforeEach, describe, expect, it } from 'vitest'
import { Menu } from './Menu'
import { MenuManager } from './MenuManager'

/**
 * Builds the real DOM shape rendered by menu/index.blade.php + menu/item.blade.php:
 * div[data-wire-menu] > ul > li > button[data-wire-menu-item]
 */
function makeMenuEl(itemCount = 3): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireMenu = ''
    const ul = document.createElement('ul')
    el.appendChild(ul)

    for (let i = 0; i < itemCount; i++) {
        const li = document.createElement('li')
        const button = document.createElement('button')
        button.dataset.wireMenuItem = ''
        button.id = `item-${i}`
        li.appendChild(button)
        ul.appendChild(li)
    }

    document.body.appendChild(el)
    return el
}

/**
 * Builds a menu with a submenu on the item at `subIndex`, matching menu/submenu.blade.php:
 * li > button[data-wire-menu-item] + div[data-wire-menu][data-wire-menu-sub]
 */
function makeMenuElWithSubmenu(subIndex = 0): { el: HTMLElement; subEl: HTMLElement } {
    const el = document.createElement('div')
    el.dataset.wireMenu = ''
    const ul = document.createElement('ul')
    el.appendChild(ul)

    let subEl!: HTMLElement
    for (let i = 0; i < 2; i++) {
        const li = document.createElement('li')
        const button = document.createElement('button')
        button.dataset.wireMenuItem = ''
        button.id = `item-${i}`
        li.appendChild(button)

        if (i === subIndex) {
            subEl = document.createElement('div')
            subEl.dataset.wireMenu = ''
            subEl.dataset.wireMenuSub = ''
            const subUl = document.createElement('ul')
            subEl.appendChild(subUl)
            const subLi = document.createElement('li')
            const subButton = document.createElement('button')
            subButton.dataset.wireMenuItem = ''
            subButton.id = 'sub-item-0'
            subLi.appendChild(subButton)
            subUl.appendChild(subLi)
            li.appendChild(subEl)
        }

        ul.appendChild(li)
    }

    document.body.appendChild(el)
    return { el, subEl }
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Menu', () => {
    describe('item discovery', () => {
        it('finds each top-level [data-wire-menu-item] against the real blade DOM shape', () => {
            const el = makeMenuEl(3)

            const menu = new Menu(el)

            expect(menu.items).toHaveLength(3)
        })

        it('does not pick up items belonging to a nested submenu', () => {
            const { el } = makeMenuElWithSubmenu(0)

            const menu = new Menu(el)

            expect(menu.items).toHaveLength(2)
        })
    })

    describe('submenu discovery', () => {
        it('attaches a Menu instance to the item that owns a submenu', () => {
            const { el } = makeMenuElWithSubmenu(0)

            const menu = new Menu(el)

            expect(menu.items[0].hasSubmenu()).toBe(true)
            expect(menu.items[1].hasSubmenu()).toBe(false)
        })

        it('sets the submenu item as its child menu parentItem', () => {
            const { el } = makeMenuElWithSubmenu(0)

            const menu = new Menu(el)

            expect(menu.items[0].subMenu?.parentItem).toBe(menu.items[0])
        })
    })

    describe('activate()/deactivate()', () => {
        it('marks the item at the given index active and focuses it', () => {
            const el = makeMenuEl(3)
            const menu = new Menu(el)

            menu.activate(1)

            expect(menu.items[0].el.dataset.state).toBeUndefined()
            expect(menu.items[1].el.dataset.state).toBe('active')
            expect(document.activeElement).toBe(menu.items[1].el)
        })

        it('ignores an out-of-range index', () => {
            const el = makeMenuEl(3)
            const menu = new Menu(el)

            menu.activate(1)
            menu.activate(99)

            expect(menu.items[1].el.dataset.state).toBe('active')
        })

        it('deactivates all items', () => {
            const el = makeMenuEl(3)
            const menu = new Menu(el)
            menu.activate(1)

            menu.deactivate()

            expect(menu.items[1].el.dataset.state).toBeUndefined()
        })

        it('activateLast() activates the final item', () => {
            const el = makeMenuEl(3)
            const menu = new Menu(el)

            menu.activateLast()

            expect(menu.items[2].el.dataset.state).toBe('active')
        })
    })

    describe('handleKeyboardEvent()', () => {
        it('ArrowDown activates the next item and wraps around', () => {
            const el = makeMenuEl(2)
            const menu = new Menu(el)
            menu.activate(1)

            menu.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))

            expect(menu.items[0].el.dataset.state).toBe('active')
        })

        it('ArrowUp activates the previous item and wraps around', () => {
            const el = makeMenuEl(2)
            const menu = new Menu(el)
            menu.activate(0)

            menu.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))

            expect(menu.items[1].el.dataset.state).toBe('active')
        })

        it('ArrowRight opens the active submenu and returns true', () => {
            const { el } = makeMenuElWithSubmenu(0)
            const menu = new Menu(el)
            menu.activate(0)

            const handled = menu.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

            expect(handled).toBe(true)
            expect(menu.items[0].subMenu?.el.style.display).toBe('block')
        })

        it('ArrowRight returns false when the active item has no submenu', () => {
            const el = makeMenuEl(2)
            const menu = new Menu(el)
            menu.activate(0)

            const handled = menu.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

            expect(handled).toBe(false)
        })

        it('ArrowLeft returns false for a top-level menu with no parent', () => {
            const el = makeMenuEl(2)
            const menu = new Menu(el)

            const handled = menu.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))

            expect(handled).toBe(false)
        })

        it('an unhandled key returns false', () => {
            const el = makeMenuEl(2)
            const menu = new Menu(el)

            const handled = menu.handleKeyboardEvent(new KeyboardEvent('keydown', { key: 'a' }))

            expect(handled).toBe(false)
        })
    })

    describe('hasParentItem() / parentItem', () => {
        it('is false and undefined for a top-level menu', () => {
            const menu = new Menu(makeMenuEl(1))

            expect(menu.hasParentItem()).toBe(false)
            expect(menu.parentItem).toBeUndefined()
        })
    })

    describe('mouseleave', () => {
        it('deactivates the menu and closes open submenus', () => {
            const { el } = makeMenuElWithSubmenu(0)
            const menu = new Menu(el)
            menu.activate(0)
            menu.items[0].openSub()

            el.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }))

            expect(menu.items[0].el.dataset.state).toBeUndefined()
            expect(menu.items[0].subMenu?.el.style.display).toBe('none')
        })

        it('sets the manager interaction mode to mouse', () => {
            const el = makeMenuEl(1)
            const manager = new MenuManager()
            const menu = new Menu(el, undefined, manager)
            manager.interaction = 'keyboard'

            el.dispatchEvent(new MouseEvent('mouseleave'))

            expect(manager.interaction).toBe('mouse')
            manager.destroy()
        })
    })
})
