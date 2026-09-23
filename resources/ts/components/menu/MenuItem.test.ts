import { beforeEach, describe, expect, it } from 'vitest'
import { MenuItem } from './MenuItem'
import type { Menu } from './Menu'

function makeItemEl(): HTMLElement {
    const el = document.createElement('button')
    el.dataset.wireMenuItem = ''
    document.body.appendChild(el)
    return el
}

function makeFakeMenu(): Menu {
    return {} as Menu
}

function makeFakeSubMenu(): Menu {
    return { el: document.createElement('div'), hasSubmenus: () => false, closeSubMenus: () => {} } as unknown as Menu
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('MenuItem', () => {
    describe('initial state', () => {
        it('is inactive on creation', () => {
            const item = new MenuItem(makeItemEl(), makeFakeMenu())

            expect(item.el.dataset.state).toBeUndefined()
            expect(item.el.tabIndex).toBe(-1)
        })

        it('exposes the underlying element via el', () => {
            const el = makeItemEl()
            const item = new MenuItem(el, makeFakeMenu())

            expect(item.el).toBe(el)
        })

        it('exposes the owning menu via menu', () => {
            const menu = makeFakeMenu()
            const item = new MenuItem(makeItemEl(), menu)

            expect(item.menu).toBe(menu)
        })

        it('has no submenu when none is given', () => {
            const item = new MenuItem(makeItemEl(), makeFakeMenu())

            expect(item.subMenu).toBeUndefined()
            expect(item.hasSubmenu()).toBe(false)
        })

        it('exposes a given submenu', () => {
            const subMenu = makeFakeSubMenu()
            const item = new MenuItem(makeItemEl(), makeFakeMenu(), subMenu)

            expect(item.subMenu).toBe(subMenu)
            expect(item.hasSubmenu()).toBe(true)
        })
    })

    describe('setActive()', () => {
        it('marks the element active and focusable', () => {
            const item = new MenuItem(makeItemEl(), makeFakeMenu())

            item.setActive(true)

            expect(item.el.dataset.state).toBe('active')
            expect(item.el.tabIndex).toBe(0)
        })

        it('clears the active state', () => {
            const item = new MenuItem(makeItemEl(), makeFakeMenu())
            item.setActive(true)

            item.setActive(false)

            expect(item.el.dataset.state).toBeUndefined()
            expect(item.el.tabIndex).toBe(-1)
        })

        it('is a no-op when setting the same state twice', () => {
            const el = makeItemEl()
            const item = new MenuItem(el, makeFakeMenu())
            item.setActive(true)
            el.blur()

            // second call with the same value should not re-run sync (which would blur on false,
            // but here true->true so tabIndex/state should remain as-is either way)
            item.setActive(true)

            expect(item.el.dataset.state).toBe('active')
        })
    })

    describe('submenu open/close', () => {
        it('shows the submenu element when opened', () => {
            const subMenuEl = document.createElement('div')
            const subMenu = { el: subMenuEl, hasSubmenus: () => false } as unknown as Menu
            const item = new MenuItem(makeItemEl(), makeFakeMenu(), subMenu)

            item.openSub()

            expect(subMenuEl.style.display).toBe('block')
        })

        it('hides the submenu element when closed', () => {
            const subMenuEl = document.createElement('div')
            const subMenu = { el: subMenuEl, hasSubmenus: () => false } as unknown as Menu
            const item = new MenuItem(makeItemEl(), makeFakeMenu(), subMenu)
            item.openSub()

            item.closeSub()

            expect(subMenuEl.style.display).toBe('none')
        })

        it('does nothing when opening a submenu that does not exist', () => {
            const item = new MenuItem(makeItemEl(), makeFakeMenu())

            expect(() => item.openSub()).not.toThrow()
        })

        it('does nothing when closing a submenu that was never opened', () => {
            const subMenuEl = document.createElement('div')
            const subMenu = { el: subMenuEl, hasSubmenus: () => false } as unknown as Menu
            const item = new MenuItem(makeItemEl(), makeFakeMenu(), subMenu)
            // construction already syncs to the closed state
            expect(subMenuEl.style.display).toBe('none')

            expect(() => item.closeSub()).not.toThrow()
            expect(subMenuEl.style.display).toBe('none')
        })

        it('recursively closes deeper submenus when closing a submenu that itself has submenus', () => {
            let closedDeep = false
            const subMenuEl = document.createElement('div')
            const subMenu = {
                el: subMenuEl,
                hasSubmenus: () => true,
                closeSubMenus: () => (closedDeep = true),
            } as unknown as Menu
            const item = new MenuItem(makeItemEl(), makeFakeMenu(), subMenu)
            item.openSub()

            item.closeSub()

            expect(subMenuEl.style.display).toBe('none')
            expect(closedDeep).toBe(true)
        })
    })

    describe('focus()', () => {
        it('focuses the underlying element', () => {
            const el = makeItemEl()
            const item = new MenuItem(el, makeFakeMenu())

            item.focus()

            expect(document.activeElement).toBe(el)
        })
    })

    describe('index', () => {
        it('delegates to the owning menu getIndex()', () => {
            const menu = { getIndex: (_q: MenuItem) => 3 } as unknown as Menu
            const item = new MenuItem(makeItemEl(), menu)

            expect(item.index).toBe(3)
        })
    })
})
