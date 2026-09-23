import { beforeEach, describe, expect, it } from 'vitest'
import { Toggle } from './Toggle'
import { initToggles } from './initToggles'

function makeToggleEl(options: {
    groupId?: string
    exclusive?: boolean
    active?: boolean
    container?: HTMLElement
} = {}): HTMLElement {
    const el = document.createElement('button')
    el.dataset.wireToggle = ''
    el.dataset.wireActive = String(options.active ?? false)
    if (options.groupId !== undefined) {
        el.dataset.wireGroup = options.groupId
        el.dataset.wireExclusive = String(options.exclusive ?? false)
    }

    const container = options.container ?? document.body
    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initToggles()', () => {
    describe('discovery', () => {
        it('returns an empty array when no toggles are on the page', () => {
            expect(initToggles()).toEqual([])
        })

        it('returns one Toggle per [data-wire-toggle] element', () => {
            makeToggleEl()
            makeToggleEl()
            makeToggleEl()

            const result = initToggles()

            expect(result).toHaveLength(3)
            expect(result[0]).toBeInstanceOf(Toggle)
        })

        it('searches inside a provided root element', () => {
            const root = document.createElement('div')
            document.body.appendChild(root)

            makeToggleEl({ container: root })
            makeToggleEl()

            expect(initToggles(root)).toHaveLength(1)
        })
    })

    describe('grouping', () => {
        it('wires toggles in the same group together in exclusive mode', () => {
            makeToggleEl({ groupId: 'g1', exclusive: true })
            makeToggleEl({ groupId: 'g1', exclusive: true })

            const [a, b] = initToggles()
            a.toggle()
            b.toggle()

            expect(a.active).toBe(false)
            expect(b.active).toBe(true)
        })

        it('does not enforce exclusivity when the group is non-exclusive', () => {
            makeToggleEl({ groupId: 'g1', exclusive: false })
            makeToggleEl({ groupId: 'g1', exclusive: false })

            const [a, b] = initToggles()
            a.toggle()
            b.toggle()

            expect(a.active).toBe(true)
            expect(b.active).toBe(true)
        })

        it('keeps toggles from different groups independent', () => {
            makeToggleEl({ groupId: 'g1', exclusive: true })
            makeToggleEl({ groupId: 'g1', exclusive: true })
            makeToggleEl({ groupId: 'g2', exclusive: true })

            const [a1, a2, b1] = initToggles()
            a1.toggle()
            b1.toggle()

            expect(a1.active).toBe(true)
            expect(b1.active).toBe(true)

            a2.toggle()
            expect(a1.active).toBe(false)
            expect(a2.active).toBe(true)
        })

        it('initialises ungrouped toggles without errors', () => {
            makeToggleEl()
            makeToggleEl()

            expect(() => initToggles()).not.toThrow()
        })
    })
})
