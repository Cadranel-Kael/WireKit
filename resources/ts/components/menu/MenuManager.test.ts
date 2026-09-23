import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { MenuManager } from './MenuManager'
import { Menu } from './Menu'
import type { MenuController } from './MenuController'

/** A real (empty) Menu backing the given element, so MenuManager's menu.items access is valid. */
function makeMenuFor(el: HTMLElement): Menu {
    if (!el.querySelector('ul')) el.appendChild(document.createElement('ul'))
    return new Menu(el)
}

function makeFakeController(el: HTMLElement, overrides: Partial<MenuController> = {}): MenuController {
    const menu = makeMenuFor(el)
    return {
        get menu() {
            return menu
        },
        open: vi.fn(),
        close: vi.fn(),
        containsElement: (target: HTMLElement) => el.contains(target),
        destroy: vi.fn(),
        ...overrides,
    } as unknown as MenuController
}

let manager: MenuManager

beforeEach(() => {
    document.body.innerHTML = ''
    manager = new MenuManager()
})

afterEach(() => {
    manager.destroy()
})

describe('MenuManager', () => {
    describe('interaction mode', () => {
        it('defaults to keyboard', () => {
            expect(manager.interaction).toBe('keyboard')
        })

        it('can be set explicitly', () => {
            manager.interaction = 'mouse'

            expect(manager.interaction).toBe('mouse')
        })

        it('switches to mouse on a global mouseover', () => {
            manager.interaction = 'keyboard'

            document.dispatchEvent(new MouseEvent('mouseover'))

            expect(manager.interaction).toBe('mouse')
        })

        it('switches to keyboard on an arrow key', () => {
            manager.interaction = 'mouse'

            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))

            expect(manager.interaction).toBe('keyboard')
        })
    })

    describe('registerMenu() / unregisterMenu()', () => {
        it('exposes registered menus', () => {
            const menu = {} as Menu

            manager.registerMenu(menu);

            expect(manager.menus).toContain(menu)
        })

        it('does not register the same menu twice', () => {
            const menu = {} as Menu

            manager.registerMenu(menu)
            manager.registerMenu(menu)

            expect(manager.menus.filter((m) => m === menu)).toHaveLength(1)
        })

        it('removes a menu on unregister', () => {
            const menu = {} as Menu
            manager.registerMenu(menu)

            manager.unregisterMenu(menu)

            expect(manager.menus).not.toContain(menu)
        })
    })

    describe('showMenu() / hideMenu() / isMenuOpen()', () => {
        it('is closed for a controller that was never shown', () => {
            const controller = makeFakeController(document.createElement('div'))
            manager.registerController(controller)

            expect(manager.isMenuOpen(controller)).toBe(false)
        })

        it('marks a controller open after showMenu()', () => {
            const controller = makeFakeController(document.createElement('div'))
            manager.registerController(controller)

            manager.showMenu(controller)

            expect(manager.isMenuOpen(controller)).toBe(true)
        })

        it('displays the controller menu element', () => {
            const el = document.createElement('div')
            document.body.appendChild(el)
            const controller = makeFakeController(el)
            manager.registerController(controller)

            manager.showMenu(controller)

            expect(el.style.display).toBe('block')
        })

        it('marks a controller closed after hideMenu()', () => {
            const controller = makeFakeController(document.createElement('div'))
            manager.registerController(controller)
            manager.showMenu(controller)

            manager.hideMenu(controller)

            expect(manager.isMenuOpen(controller)).toBe(false)
        })

        it('hides the controller menu element', () => {
            const el = document.createElement('div')
            document.body.appendChild(el)
            const controller = makeFakeController(el)
            manager.registerController(controller)
            manager.showMenu(controller)

            manager.hideMenu(controller)

            expect(el.style.display).toBe('none')
        })
    })

    describe('closeAllControllers via Escape', () => {
        it('closes every open controller on Escape', () => {
            const a = makeFakeController(document.createElement('div'))
            const b = makeFakeController(document.createElement('div'))
            manager.registerController(a)
            manager.registerController(b)
            manager.showMenu(a)
            manager.showMenu(b)

            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

            expect(a.close).toHaveBeenCalledOnce()
            expect(b.close).toHaveBeenCalledOnce()
        })

        it('does not close a controller that is already closed', () => {
            const a = makeFakeController(document.createElement('div'))
            manager.registerController(a)

            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

            expect(a.close).not.toHaveBeenCalled()
        })

        it('closes all controllers on Tab too', () => {
            const a = makeFakeController(document.createElement('div'))
            manager.registerController(a)
            manager.showMenu(a)

            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))

            expect(a.close).toHaveBeenCalledOnce()
        })
    })

    describe('click-away', () => {
        it('closes open controllers when clicking outside all of them', () => {
            const el = document.createElement('div')
            document.body.appendChild(el)
            const controller = makeFakeController(el)
            manager.registerController(controller)
            manager.showMenu(controller)

            const outside = document.createElement('div')
            document.body.appendChild(outside)
            outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))

            expect(controller.close).toHaveBeenCalledOnce()
        })

        it('does not close when the click lands inside a controller', () => {
            const el = document.createElement('div')
            const inner = document.createElement('span')
            el.appendChild(inner)
            document.body.appendChild(el)
            const controller = makeFakeController(el)
            manager.registerController(controller)
            manager.showMenu(controller)

            inner.dispatchEvent(new MouseEvent('click', { bubbles: true }))

            expect(controller.close).not.toHaveBeenCalled()
        })
    })

    describe('registerController() / unregisterController()', () => {
        it('does not throw when registering the same controller twice', () => {
            const controller = makeFakeController(document.createElement('div'))

            expect(() => {
                manager.registerController(controller)
                manager.registerController(controller)
            }).not.toThrow()
        })

        it('an unregistered controller reports closed', () => {
            const controller = makeFakeController(document.createElement('div'))
            manager.registerController(controller)
            manager.showMenu(controller)

            manager.unregisterController(controller)

            expect(manager.isMenuOpen(controller)).toBe(false)
        })
    })

    describe('getInstance()', () => {
        it('returns the same instance on repeated calls', () => {
            expect(MenuManager.getInstance()).toBe(MenuManager.getInstance())
        })
    })

    describe('destroy()', () => {
        it('stops reacting to clicks away after being destroyed', () => {
            const el = document.createElement('div')
            document.body.appendChild(el)
            const controller = makeFakeController(el)
            manager.registerController(controller)
            manager.showMenu(controller)

            manager.destroy()

            const outside = document.createElement('div')
            document.body.appendChild(outside)
            outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))

            expect(controller.close).not.toHaveBeenCalled()
        })

        it('stops reacting to Escape after being destroyed', () => {
            const controller = makeFakeController(document.createElement('div'))
            manager.registerController(controller)
            manager.showMenu(controller)

            manager.destroy()
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

            expect(controller.close).not.toHaveBeenCalled()
        })
    })
})
