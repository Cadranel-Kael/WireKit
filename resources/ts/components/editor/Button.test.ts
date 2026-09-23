import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Button } from './Button'
import type { Editor } from '@tiptap/core'

function makePlainButton(command: string, extra: Record<string, string> = {}): HTMLElement {
    const el = document.createElement('button')
    el.dataset.command = command
    Object.entries(extra).forEach(([k, v]) => (el.dataset[k] = v))
    document.body.appendChild(el)
    return el
}

function makeDropdownFixture(defaultIcon: string, items: Array<{ command: string; icon: string; level?: string }>) {
    const dropdown = document.createElement('div')
    dropdown.setAttribute('data-wire-dropdown', '')

    const trigger = document.createElement('button')
    trigger.setAttribute('data-wire-button', '')
    const triggerIcons: Record<string, HTMLElement> = {}
    ;[defaultIcon, ...items.map((i) => i.icon)].forEach((icon) => {
        if (triggerIcons[icon]) return
        const svg = document.createElement('span')
        svg.setAttribute('data-trigger-icon', icon)
        trigger.appendChild(svg)
        triggerIcons[icon] = svg
    })
    dropdown.appendChild(trigger)

    const menu = document.createElement('div')
    menu.setAttribute('data-wire-menu', '')
    const ul = document.createElement('ul')
    const menuButtons: HTMLElement[] = []
    items.forEach(({ command, icon, level }) => {
        const li = document.createElement('li')
        const btn = document.createElement('button')
        btn.dataset.command = command
        btn.dataset.icon = icon
        if (level !== undefined) btn.dataset.level = level
        li.appendChild(btn)
        ul.appendChild(li)
        menuButtons.push(btn)
    })
    menu.appendChild(ul)
    dropdown.appendChild(menu)

    document.body.appendChild(dropdown)
    return { dropdown, triggerIcons, menuButtons }
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Button', () => {
    describe('construction', () => {
        it('reads the command from data-command', () => {
            const el = makePlainButton('bold')
            const button = new Button(el, vi.fn())

            expect(button.command).toBe('bold')
        })

        it('resolves a level param from data-level', () => {
            const el = makePlainButton('heading', { level: '2' })
            const button = new Button(el, vi.fn())

            expect(button.params).toEqual({ level: 2 })
        })

        it('resolves an alignment param from data-align', () => {
            const el = makePlainButton('align', { align: 'center' })
            const button = new Button(el, vi.fn())

            expect(button.params).toEqual({ alignment: 'center' })
        })

        it('has empty params when neither level nor align are set', () => {
            const el = makePlainButton('bold')
            const button = new Button(el, vi.fn())

            expect(button.params).toEqual({})
        })
    })

    describe('click handling', () => {
        it('invokes the execute callback with the command and params on click', () => {
            const el = makePlainButton('heading', { level: '3' })
            const onExecute = vi.fn()
            new Button(el, onExecute)

            el.click()

            expect(onExecute).toHaveBeenCalledOnce()
            expect(onExecute).toHaveBeenCalledWith('heading', { level: 3 })
        })
    })

    describe('destroy()', () => {
        it('stops invoking the callback after destroy', () => {
            const el = makePlainButton('bold')
            const onExecute = vi.fn()
            const button = new Button(el, onExecute)

            button.destroy()
            el.click()

            expect(onExecute).not.toHaveBeenCalled()
        })
    })

    describe('update() — plain toolbar button (no dropdown trigger icon)', () => {
        it('sets data-state to active when the tool reports active', () => {
            const el = makePlainButton('bold')
            const button = new Button(el, vi.fn())
            const editor = { isActive: () => true } as unknown as Editor

            button.update(editor)

            expect(el.dataset.state).toBe('active')
        })

        it('clears data-state when the tool reports inactive', () => {
            const el = makePlainButton('bold')
            const button = new Button(el, vi.fn())
            const editor = { isActive: () => false } as unknown as Editor

            button.update(editor)

            expect(el.dataset.state).toBe('')
        });

        it('does not throw for a command with no registry entry', () => {
            const el = makePlainButton('not-a-real-command')
            const button = new Button(el, vi.fn())
            const editor = {} as Editor

            expect(() => button.update(editor)).not.toThrow()
            expect(el.dataset.state).toBe('')
        })
    })

    describe('update() — dropdown trigger icon sync', () => {
        it('shows the icon for the active heading level and hides the rest', () => {
            const { triggerIcons, menuButtons } = makeDropdownFixture('heading', [
                { command: 'heading', icon: 'heading-1', level: '1' },
                { command: 'heading', icon: 'heading-2', level: '2' },
            ])
            const onLevel1 = new Button(menuButtons[0], vi.fn())
            const onLevel2 = new Button(menuButtons[1], vi.fn())

            const editor = {
                isActive: (name: string, attrs?: { level?: number }) => name === 'heading' && attrs?.level === 1,
            } as unknown as Editor

            onLevel1.update(editor)
            onLevel2.update(editor)

            expect(triggerIcons['heading-1'].style.display).toBe('')
            expect(triggerIcons['heading-2'].style.display).toBe('none')
        })

        it('finds the trigger icon across the dropdown, menu and list nesting', () => {
            const { triggerIcons, menuButtons } = makeDropdownFixture('heading', [
                { command: 'heading', icon: 'heading-1', level: '1' },
            ])
            const button = new Button(menuButtons[0], vi.fn())
            const editor = { isActive: () => true } as unknown as Editor

            button.update(editor)

            expect(triggerIcons['heading-1'].style.display).toBe('')
        })
    })
})
