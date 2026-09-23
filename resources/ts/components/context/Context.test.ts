import { beforeEach, describe, expect, it } from 'vitest'
import { Context } from './Context'
import { MenuManager } from '../menu/MenuManager'

/**
 * Real DOM shape rendered by context/index.blade.php + context/menu.blade.php:
 * div[data-wire-context] > div[wire-data-context-menu] > ul > li > button[data-wire-menu-item]
 */
function makeContextEl(itemCount = 2): { el: HTMLElement; menuEl: HTMLElement; items: HTMLElement[] } {
    const el = document.createElement('div')
    el.dataset.wireContext = ''

    const menuEl = document.createElement('div')
    menuEl.setAttribute('wire-data-context-menu', '')
    const ul = document.createElement('ul')
    menuEl.appendChild(ul)

    const items: HTMLElement[] = []
    for (let i = 0; i < itemCount; i++) {
        const li = document.createElement('li')
        const button = document.createElement('button')
        button.dataset.wireMenuItem = ''
        button.id = `item-${i}`
        li.appendChild(button)
        ul.appendChild(li)
        items.push(button)
    }

    el.appendChild(menuEl)
    document.body.appendChild(el)
    return { el, menuEl, items }
}

beforeEach(() => {
    document.body.innerHTML = ''
    // Context always pulls MenuManager.getInstance(); force a fresh singleton per test
    // so controllers/menus registered by a previous test can't leak into this one.
    ;(MenuManager as unknown as { _instance: MenuManager | null })._instance = null
})

describe('Context', () => {
    describe('initial state', () => {
        it('starts closed', () => {
            // Note: the context menu has no popover/CSS default-hidden mechanism of its own
            // (unlike dropdown menus, which get `popover`), so this checks tracked open state
            // rather than inline display — the element itself isn't hidden until hideMenu() runs.
            const { el } = makeContextEl()
            const context = new Context(el)

            expect(MenuManager.getInstance().isMenuOpen(context)).toBe(false)
        })

        it('exposes the menu built from [wire-data-context-menu]', () => {
            const { el, menuEl } = makeContextEl()
            const context = new Context(el)

            expect(context.menu.el).toBe(menuEl)
        })
    })

    describe('open()', () => {
        it('shows the menu', () => {
            const { el } = makeContextEl()
            const context = new Context(el)

            context.open()

            expect(context.menu.el.style.display).toBe('block')
        })

        it('is a no-op when already open', () => {
            const { el, items } = makeContextEl()
            const context = new Context(el)
            context.open()
            items[0].focus()

            context.open()

            // activate(-1) would have stolen focus back to the menu on a second showMenu() call
            expect(document.activeElement).toBe(items[0])
        })

        it('positions the menu at the pointer event location', () => {
            const { el } = makeContextEl()
            const context = new Context(el)
            el.getBoundingClientRect = () => ({ left: 10, top: 20 }) as DOMRect

            context.open({ clientX: 50, clientY: 80, preventDefault: () => {} } as unknown as PointerEvent)

            expect(context.menu.el.style.left).toBe('40px')
            expect(context.menu.el.style.top).toBe('60px')
        })

        it('prevents the default browser context menu', () => {
            const { el } = makeContextEl()
            const context = new Context(el)
            let prevented = false

            context.open({ clientX: 1, clientY: 1, preventDefault: () => (prevented = true) } as unknown as PointerEvent)

            expect(prevented).toBe(true)
        })

        it('opens automatically on a contextmenu event', () => {
            const { el } = makeContextEl()
            const context = new Context(el)

            el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 5, clientY: 5 }))

            expect(context.menu.el.style.display).toBe('block')
        })
    })

    describe('close()', () => {
        it('hides an open menu', () => {
            const { el } = makeContextEl()
            const context = new Context(el)
            context.open()

            context.close()

            expect(context.menu.el.style.display).toBe('none')
        })

        it('is a no-op when already closed and not forced', () => {
            const { el } = makeContextEl()
            const context = new Context(el)
            const before = context.menu.el.style.display

            expect(() => context.close()).not.toThrow()
            expect(context.menu.el.style.display).toBe(before)
        })

        it('closes on a click inside the context element', () => {
            const { el } = makeContextEl()
            const context = new Context(el)
            context.open()

            el.dispatchEvent(new MouseEvent('click', { bubbles: true }))

            expect(context.menu.el.style.display).toBe('none')
        })
    })

    describe('containsElement()', () => {
        it('is true for an element inside the menu', () => {
            const { el, items } = makeContextEl()
            const context = new Context(el)

            expect(context.containsElement(items[0])).toBe(true)
        })

        it('is false for an element outside the menu', () => {
            const { el } = makeContextEl()
            const context = new Context(el)
            const outside = document.createElement('div')
            document.body.appendChild(outside)

            expect(context.containsElement(outside)).toBe(false)
        })
    })

    describe('registerAllMenus()', () => {
        it('registers its own menu with the manager', () => {
            const { el } = makeContextEl()
            const context = new Context(el)

            expect(MenuManager.getInstance().menus).toContain(context.menu)
        })
    })

    describe('destroy()', () => {
        it('does not throw', () => {
            const { el } = makeContextEl()
            const context = new Context(el)

            expect(() => context.destroy()).not.toThrow()
        })

        it('stops opening on contextmenu after being destroyed', () => {
            const { el } = makeContextEl()
            const context = new Context(el)

            context.destroy()
            el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }))

            expect(context.menu.el.style.display).not.toBe('block')
        })

        it('unregisters its menu from the manager', () => {
            const { el } = makeContextEl()
            const context = new Context(el)
            const manager = MenuManager.getInstance()

            context.destroy()

            expect(manager.menus).not.toContain(context.menu)
        })
    })
})
