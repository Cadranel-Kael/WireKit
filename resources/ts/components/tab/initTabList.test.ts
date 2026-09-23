import { beforeEach, describe, expect, it } from 'vitest'
import { TabGroup } from './TabGroup'
import { initTabList } from './initTabList'

function makeGroupEl(groupId: string, container: HTMLElement = document.body): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireTabGroup = ''
    el.id = groupId

    const trigger = document.createElement('button')
    trigger.dataset.wireTab = 'a'
    trigger.id = `tab-a-${groupId}`
    el.appendChild(trigger)

    const panel = document.createElement('div')
    panel.id = `panel-a-${groupId}`
    el.appendChild(panel)

    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initTabList()', () => {
    it('returns an empty array when no tab groups are on the page', () => {
        const result = initTabList()

        expect(result).toEqual([])
    })

    it('returns one TabGroup per [data-wire-tab-group] element', () => {
        makeGroupEl('group-1')
        makeGroupEl('group-2')

        const result = initTabList()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(TabGroup)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeGroupEl('inside', root)
        makeGroupEl('outside')

        const result = initTabList(root)

        expect(result).toHaveLength(1)
        expect(result[0].id).toBe('inside')
    })

    it('defaults to document as root', () => {
        makeGroupEl('group-1')

        const result = initTabList(document)

        expect(result).toHaveLength(1)
    })
})
