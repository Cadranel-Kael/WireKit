import { beforeEach, describe, expect, it } from 'vitest'
import { TabGroup } from './TabGroup'

function makeGroupEl(
    tabs: Array<{ name: string; disabled?: boolean }>,
    groupId = 'group-1',
): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireTabGroup = ''
    el.id = groupId

    tabs.forEach(({ name, disabled }) => {
        const trigger = document.createElement('button')
        trigger.dataset.wireTab = name
        trigger.id = `tab-${name}-${groupId}`
        if (disabled) trigger.disabled = true
        el.appendChild(trigger)

        const panel = document.createElement('div')
        panel.id = `panel-${name}-${groupId}`
        el.appendChild(panel)
    })

    document.body.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('TabGroup', () => {
    describe('initial selection', () => {
        it('selects the first tab by default', () => {
            const el = makeGroupEl([{ name: 'a' }, { name: 'b' }])
            new TabGroup(el)

            const a = document.getElementById('tab-a-group-1') as HTMLButtonElement
            const b = document.getElementById('tab-b-group-1') as HTMLButtonElement

            expect(a.dataset.state).toBe('active')
            expect(b.dataset.state).toBe('inactive')
        })

        it('skips a disabled first tab and selects the next enabled one', () => {
            const el = makeGroupEl([{ name: 'a', disabled: true }, { name: 'b' }])
            new TabGroup(el)

            const a = document.getElementById('tab-a-group-1') as HTMLButtonElement
            const b = document.getElementById('tab-b-group-1') as HTMLButtonElement

            expect(a.dataset.state).toBe('inactive')
            expect(b.dataset.state).toBe('active')
        })

        it('shows the panel for the selected tab and hides the rest', () => {
            const el = makeGroupEl([{ name: 'a' }, { name: 'b' }])
            new TabGroup(el)

            const panelA = document.getElementById('panel-a-group-1') as HTMLElement
            const panelB = document.getElementById('panel-b-group-1') as HTMLElement

            expect(panelA.style.display).toBe('block')
            expect(panelB.style.display).toBe('none')
        })

        it('sets aria-selected on the selected and unselected triggers', () => {
            const el = makeGroupEl([{ name: 'a' }, { name: 'b' }])
            new TabGroup(el)

            const a = document.getElementById('tab-a-group-1') as HTMLButtonElement
            const b = document.getElementById('tab-b-group-1') as HTMLButtonElement

            expect(a.getAttribute('aria-selected')).toBe('true')
            expect(b.getAttribute('aria-selected')).toBe('false')
        })

        it('gives only the selected trigger a tabIndex of 0', () => {
            const el = makeGroupEl([{ name: 'a' }, { name: 'b' }])
            new TabGroup(el)

            const a = document.getElementById('tab-a-group-1') as HTMLButtonElement
            const b = document.getElementById('tab-b-group-1') as HTMLButtonElement

            expect(a.tabIndex).toBe(0)
            expect(b.tabIndex).toBe(-1)
        })
    })

    describe('id', () => {
        it('exposes the group element id', () => {
            const el = makeGroupEl([{ name: 'a' }], 'my-group')
            const group = new TabGroup(el)

            expect(group.id).toBe('my-group')
        })
    })

    describe('clicking a trigger', () => {
        it('switches the active tab and panel', () => {
            const el = makeGroupEl([{ name: 'a' }, { name: 'b' }])
            new TabGroup(el)

            const b = document.getElementById('tab-b-group-1') as HTMLButtonElement
            b.click()

            const a = document.getElementById('tab-a-group-1') as HTMLButtonElement
            const panelA = document.getElementById('panel-a-group-1') as HTMLElement
            const panelB = document.getElementById('panel-b-group-1') as HTMLElement

            expect(b.dataset.state).toBe('active')
            expect(a.dataset.state).toBe('inactive')
            expect(panelB.style.display).toBe('block')
            expect(panelA.style.display).toBe('none')
        })

        it('does nothing when clicking a disabled trigger', () => {
            const el = makeGroupEl([{ name: 'a' }, { name: 'b', disabled: true }])
            new TabGroup(el)

            const b = document.getElementById('tab-b-group-1') as HTMLButtonElement
            b.click()

            const a = document.getElementById('tab-a-group-1') as HTMLButtonElement
            expect(a.dataset.state).toBe('active')
            expect(b.dataset.state).toBe('inactive')
        })
    })
})
