import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Tab } from './Tab'
import type { TabGroup } from './TabGroup'

function makeGroupFixture(name: string, options: { disabled?: boolean; withPanel?: boolean } = {}) {
    const groupId = 'group-1'
    const trigger = document.createElement('button')
    trigger.id = `tab-${name}-${groupId}`
    if (options.disabled) trigger.disabled = true
    document.body.appendChild(trigger)

    let panel: HTMLElement | null = null
    if (options.withPanel ?? true) {
        panel = document.createElement('div')
        panel.id = `panel-${name}-${groupId}`
        document.body.appendChild(panel)
    }

    return { trigger, panel, groupId }
}

function makeFakeGroup(id = 'group-1'): TabGroup & { show: ReturnType<typeof vi.fn> } {
    return { id, show: vi.fn() } as unknown as TabGroup & { show: ReturnType<typeof vi.fn> }
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Tab', () => {
    describe('initialisation', () => {
        it('locates its trigger and panel by id', () => {
            const { trigger, panel } = makeGroupFixture('general')
            const group = makeFakeGroup()

            const tab = new Tab(group, 'general')

            expect(tab.trigger).toBe(trigger)
            expect(tab.panel).toBe(panel)
        });

        it('exposes a null panel when none exists', () => {
            makeGroupFixture('general', { withPanel: false })
            const group = makeFakeGroup()

            const tab = new Tab(group, 'general')

            expect(tab.panel).toBeNull()
        })

        it('reads the disabled state from the trigger', () => {
            makeGroupFixture('general', { disabled: true })
            const group = makeFakeGroup()

            const tab = new Tab(group, 'general')

            expect(tab.disabled).toBe(true)
        })

        it('is enabled by default', () => {
            makeGroupFixture('general')
            const group = makeFakeGroup()

            const tab = new Tab(group, 'general')

            expect(tab.disabled).toBe(false)
        })
    })

    describe('click handling', () => {
        it('asks the group to show itself when clicked', () => {
            makeGroupFixture('general')
            const group = makeFakeGroup()
            const tab = new Tab(group, 'general')

            tab.trigger.click()

            expect(group.show).toHaveBeenCalledOnce()
            expect(group.show).toHaveBeenCalledWith(tab)
        })

        it('does not ask the group to show when disabled', () => {
            makeGroupFixture('general', { disabled: true })
            const group = makeFakeGroup()
            const tab = new Tab(group, 'general')

            tab.trigger.click()

            expect(group.show).not.toHaveBeenCalled()
        })
    })

    describe('destroy', () => {
        it('stops reacting to clicks after being destroyed', () => {
            makeGroupFixture('general')
            const group = makeFakeGroup()
            const tab = new Tab(group, 'general')

            tab.destroy()
            tab.trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))

            expect(group.show).not.toHaveBeenCalled()
        })
    })
})
