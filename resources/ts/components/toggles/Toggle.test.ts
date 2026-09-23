import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Toggle } from './Toggle'

function makeEl(options: { active?: boolean; exclusive?: boolean } = {}): HTMLButtonElement {
    const el = document.createElement('button')
    el.dataset.wireToggle = ''
    el.dataset.wireActive = String(options.active ?? false)
    el.dataset.wireExclusive = String(options.exclusive ?? false)

    document.body.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Toggle', () => {
    describe('initial state', () => {
        it('initialises as inactive when data-wire-active is false', () => {
            const toggle = new Toggle(makeEl({ active: false }))

            expect(toggle.active).toBe(false)
        })

        it('initialises as active when data-wire-active is true', () => {
            const toggle = new Toggle(makeEl({ active: true }))

            expect(toggle.active).toBe(true)
        })

        it('sets data-state to off when inactive', () => {
            const el = makeEl({ active: false })
            new Toggle(el)

            expect(el.dataset.state).toBe('off')
        })

        it('sets data-state to on when active', () => {
            const el = makeEl({ active: true })
            new Toggle(el)

            expect(el.dataset.state).toBe('on')
        })

        it('sets aria-pressed to match the active state', () => {
            const el = makeEl({ active: true })
            new Toggle(el)

            expect(el.ariaPressed).toBe('true')
        })

        it('exposes the exclusive flag from the dataset', () => {
            const toggle = new Toggle(makeEl({ exclusive: true }))

            expect(toggle.exclusive).toBe(true)
        })

        it('exposes the root element via el getter', () => {
            const el = makeEl()
            const toggle = new Toggle(el)

            expect(toggle.el).toBe(el)
        })
    })

    describe('toggle()', () => {
        it('activates when inactive', () => {
            const toggle = new Toggle(makeEl({ active: false }))

            toggle.toggle()

            expect(toggle.active).toBe(true)
        })

        it('deactivates when active', () => {
            const toggle = new Toggle(makeEl({ active: true }))

            toggle.toggle()

            expect(toggle.active).toBe(false)
        })

        it('forces activation with toggle(true)', () => {
            const toggle = new Toggle(makeEl({ active: false }))

            toggle.toggle(true)

            expect(toggle.active).toBe(true)
        })

        it('is a no-op when forcing the current state', () => {
            const toggle = new Toggle(makeEl({ active: false }))
            const listener = vi.fn()
            toggle.onChange(listener)

            toggle.toggle(false)

            expect(listener).not.toHaveBeenCalled()
        })
    })

    describe('deactivate()', () => {
        it('deactivates an active toggle', () => {
            const toggle = new Toggle(makeEl({ active: true }))

            toggle.deactivate()

            expect(toggle.active).toBe(false)
        })

        it('is a no-op on an already inactive toggle', () => {
            const toggle = new Toggle(makeEl({ active: false }))
            const listener = vi.fn()
            toggle.onChange(listener)

            toggle.deactivate()

            expect(listener).not.toHaveBeenCalled()
        })
    })

    describe('onChange()', () => {
        it('fires the callback when the toggle activates', () => {
            const toggle = new Toggle(makeEl({ active: false }))
            const listener = vi.fn()
            toggle.onChange(listener)

            toggle.toggle()

            expect(listener).toHaveBeenCalledOnce()
            expect(listener).toHaveBeenCalledWith(toggle)
        })

        it('supports multiple listeners', () => {
            const toggle = new Toggle(makeEl())
            const a = vi.fn()
            const b = vi.fn()
            toggle.onChange(a)
            toggle.onChange(b)

            toggle.toggle()

            expect(a).toHaveBeenCalledOnce()
            expect(b).toHaveBeenCalledOnce()
        })
    })

    describe('click handling', () => {
        it('toggles on click', () => {
            const el = makeEl({ active: false })
            const toggle = new Toggle(el)

            el.click()

            expect(toggle.active).toBe(true)
        })

        it('toggles back on a second click', () => {
            const el = makeEl({ active: false })
            const toggle = new Toggle(el)

            el.click()
            el.click()

            expect(toggle.active).toBe(false)
        })
    })
})
