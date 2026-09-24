import { beforeEach, describe, expect, it } from 'vitest'
import { Sidebar } from './Sidebar'
import { initSidebars } from './initSidebars'

function makeSidebarEl(container: HTMLElement = document.body, id = 'sidebar'): HTMLElement {
    const el = document.createElement('div')
    el.id = id
    el.dataset.wireSidebar = ''
    el.dataset.wireExpanded = 'true'
    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initSidebars()', () => {
    it('returns an empty array when no sidebars are on the page', () => {
        expect(initSidebars()).toEqual([])
    })

    it('returns one Sidebar per [data-wire-sidebar] element', () => {
        makeSidebarEl(document.body, 'a')
        makeSidebarEl(document.body, 'b')

        const result = initSidebars()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(Sidebar)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeSidebarEl(root, 'inside')
        makeSidebarEl(document.body, 'outside')

        expect(initSidebars(root)).toHaveLength(1)
    })

    it('initialises the root itself when it is the matching element', () => {
        const el = makeSidebarEl()

        const result = initSidebars(el)

        expect(result).toHaveLength(1)
    })

    it('does not construct a second instance for an element already initialised', () => {
        makeSidebarEl()

        initSidebars()
        const second = initSidebars()

        expect(second).toHaveLength(0)
    })
})
