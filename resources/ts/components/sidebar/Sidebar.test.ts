import { beforeEach, describe, expect, it } from 'vitest'
import { Sidebar } from './Sidebar'

// happy-dom's document.cookie doesn't honor `expires`-based deletion, so a
// cookie written by one test is still visible to the next. Rather than
// fight that, every test gets its own id (and therefore its own
// "wire-sidebar-{id}" cookie name) so tests can never read a cookie left
// behind by another one.
let idCounter = 0
function uniqueId() {
    return `sidebar-${++idCounter}`
}

function makeEl(options: { id?: string; expanded?: boolean } = {}): HTMLElement {
    const el = document.createElement('div')
    el.id = options.id ?? uniqueId()
    el.dataset.wireSidebar = ''
    el.dataset.wireExpanded = String(options.expanded ?? true)
    document.body.appendChild(el)
    return el
}

function makeTrigger(id: string, action?: string): HTMLButtonElement {
    const btn = document.createElement('button')
    btn.dataset.wireSidebarTrigger = id
    if (action) btn.dataset.wireSidebarAction = action
    document.body.appendChild(btn)
    return btn
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Sidebar', () => {
    describe('initial state', () => {
        it('initialises as expanded when data-wire-expanded is true', () => {
            const el = makeEl({ expanded: true })
            const sidebar = new Sidebar(el)

            expect(sidebar.isExpanded).toBe(true)
        })

        it('initialises as collapsed when data-wire-expanded is false', () => {
            const el = makeEl({ expanded: false })
            const sidebar = new Sidebar(el)

            expect(sidebar.isExpanded).toBe(false)
        })

        it('prefers a stored cookie over data-wire-expanded', () => {
            const id = uniqueId()
            document.cookie = `wire-sidebar-${id}=closed`
            const el = makeEl({ id, expanded: true })

            const sidebar = new Sidebar(el)

            expect(sidebar.isExpanded).toBe(false)
        })

        it('applies expanded classes on init', () => {
            const el = makeEl({ expanded: true })
            new Sidebar(el)

            expect(el.classList.contains('w-2xs')).toBe(true)
            expect(el.classList.contains('w-0')).toBe(false)
        })

        it('applies collapsed classes on init', () => {
            const el = makeEl({ expanded: false })
            new Sidebar(el)

            expect(el.classList.contains('w-0')).toBe(true)
            expect(el.classList.contains('w-2xs')).toBe(false)
        })
    })

    describe('toggle()', () => {
        it('collapses an expanded sidebar', () => {
            const el = makeEl({ expanded: true })
            const sidebar = new Sidebar(el)

            sidebar.toggle()

            expect(sidebar.isExpanded).toBe(false)
        })

        it('expands a collapsed sidebar', () => {
            const el = makeEl({ expanded: false })
            const sidebar = new Sidebar(el)

            sidebar.toggle()

            expect(sidebar.isExpanded).toBe(true)
        })

        it('updates data-wire-expanded after toggling', () => {
            const el = makeEl({ expanded: true })
            const sidebar = new Sidebar(el)

            sidebar.toggle()

            expect(el.dataset.wireExpanded).toBe('false')
        })

        it('swaps classes after toggling', () => {
            const el = makeEl({ expanded: true })
            const sidebar = new Sidebar(el)

            sidebar.toggle()

            expect(el.classList.contains('w-0')).toBe(true)
            expect(el.classList.contains('w-2xs')).toBe(false)
        })

        it('persists the new state to a cookie', () => {
            const id = uniqueId()
            const el = makeEl({ id, expanded: true })
            const sidebar = new Sidebar(el)

            sidebar.toggle()

            expect(document.cookie).toContain(`wire-sidebar-${id}=closed`)
        })
    })

    describe('expand()/collapse()', () => {
        it('expand() is a no-op when already expanded', () => {
            const id = uniqueId()
            const el = makeEl({ id, expanded: true })
            const sidebar = new Sidebar(el)

            sidebar.expand()

            expect(document.cookie).not.toContain(`wire-sidebar-${id}=`)
        })

        it('collapse() collapses an expanded sidebar', () => {
            const el = makeEl({ expanded: true })
            const sidebar = new Sidebar(el)

            sidebar.collapse()

            expect(sidebar.isExpanded).toBe(false)
        })
    })

    describe('trigger clicks', () => {
        it('toggles the sidebar when a matching trigger is clicked', () => {
            const id = uniqueId()
            const el = makeEl({ id, expanded: true })
            const sidebar = new Sidebar(el)
            const trigger = makeTrigger(id)

            trigger.click()

            expect(sidebar.isExpanded).toBe(false)
        })

        it('ignores triggers for a different sidebar', () => {
            const id = uniqueId()
            const el = makeEl({ id, expanded: true })
            const sidebar = new Sidebar(el)
            const otherTrigger = makeTrigger('other-sidebar')

            otherTrigger.click()

            expect(sidebar.isExpanded).toBe(true)
        })

        it('forces open with an explicit action="open" trigger', () => {
            const id = uniqueId()
            const el = makeEl({ id, expanded: false })
            const sidebar = new Sidebar(el)
            const trigger = makeTrigger(id, 'open')

            trigger.click()

            expect(sidebar.isExpanded).toBe(true)
        })

        it('forces closed with an explicit action="close" trigger', () => {
            const id = uniqueId()
            const el = makeEl({ id, expanded: true })
            const sidebar = new Sidebar(el)
            const trigger = makeTrigger(id, 'close')

            trigger.click()

            expect(sidebar.isExpanded).toBe(false)
        })
    })

    describe('destroy()', () => {
        it('stops reacting to trigger clicks after being destroyed', () => {
            const id = uniqueId()
            const el = makeEl({ id, expanded: true })
            const sidebar = new Sidebar(el)
            const trigger = makeTrigger(id)

            sidebar.destroy()
            trigger.click()

            expect(sidebar.isExpanded).toBe(true)
        })
    })
})
