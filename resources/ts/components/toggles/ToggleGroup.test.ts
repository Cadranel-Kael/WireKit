import { beforeEach, describe, expect, it } from 'vitest'
import { Toggle } from './Toggle'
import { ToggleGroup } from './ToggleGroup'

function makeToggle(active = false): Toggle {
    const el = document.createElement('button')
    el.dataset.wireToggle = ''
    el.dataset.wireActive = String(active)
    document.body.appendChild(el)
    return new Toggle(el)
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('ToggleGroup', () => {
    describe('exclusive mode (default)', () => {
        it('deactivates other toggles when one activates', () => {
            const a = makeToggle(false)
            const b = makeToggle(false)
            const c = makeToggle(false)
            new ToggleGroup([a, b, c])

            a.toggle()

            expect(a.active).toBe(true)
            expect(b.active).toBe(false)
            expect(c.active).toBe(false)
        })

        it('deactivates the previously active toggle when a new one activates', () => {
            const a = makeToggle(true)
            const b = makeToggle(false)
            new ToggleGroup([a, b])

            b.toggle()

            expect(b.active).toBe(true)
            expect(a.active).toBe(false)
        })

        it('does not deactivate others when deactivating (not activating)', () => {
            const a = makeToggle(true)
            const b = makeToggle(true)
            new ToggleGroup([a, b])

            a.deactivate()

            expect(b.active).toBe(true)
        })
    })

    describe('non-exclusive mode', () => {
        it('allows multiple toggles to be active at once', () => {
            const a = makeToggle(false)
            const b = makeToggle(false)
            new ToggleGroup([a, b], false)

            a.toggle()
            b.toggle()

            expect(a.active).toBe(true)
            expect(b.active).toBe(true)
        })
    })

    describe('with an empty group', () => {
        it('constructs without throwing', () => {
            expect(() => new ToggleGroup([])).not.toThrow()
        })
    })
})
