import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InlineEdit } from './InlineEdit'

function makeLivewireStub() {
    return {
        dispatch: vi.fn(),
    }
}

function makeEl(options: { id?: string; value?: string } = {}): HTMLElement {
    const el = document.createElement('span')
    el.dataset.wireInlineEdit = ''
    if (options.id) el.id = options.id

    const display = document.createElement('span')
    display.dataset.wireInlineEditDisplay = ''
    if (options.id) display.dataset.wireInlineEditTrigger = options.id
    el.appendChild(display)

    const input = document.createElement('input')
    input.dataset.wireInlineEditInput = ''
    input.value = options.value ?? ''
    input.hidden = true
    el.appendChild(input)

    document.body.appendChild(el)
    return el
}

let livewire: ReturnType<typeof makeLivewireStub>

beforeEach(() => {
    document.body.innerHTML = ''
    livewire = makeLivewireStub()
    ;(globalThis as unknown as { Livewire: typeof livewire }).Livewire = livewire
})

describe('InlineEdit', () => {
    describe('initial state', () => {
        it('starts with the display shown and the input hidden', () => {
            const el = makeEl({ id: 'name', value: 'Photos' })
            new InlineEdit(el)

            const display = el.querySelector('[data-wire-inline-edit-display]') as HTMLElement
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement

            expect(display.hidden).toBe(false)
            expect(input.hidden).toBe(true)
        })
    })

    describe('opening', () => {
        it('shows the input and hides the display when the display (self-trigger) is clicked', () => {
            const el = makeEl({ id: 'name', value: 'Photos' })
            new InlineEdit(el)
            const display = el.querySelector('[data-wire-inline-edit-display]') as HTMLElement
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement

            display.click()

            expect(display.hidden).toBe(true)
            expect(input.hidden).toBe(false)
        })

        it('opens via an external trigger elsewhere in the document', () => {
            const el = makeEl({ id: 'rename-folder-1', value: 'Photos' })
            const externalTrigger = document.createElement('button')
            externalTrigger.dataset.wireInlineEditTrigger = 'rename-folder-1'
            document.body.appendChild(externalTrigger)
            new InlineEdit(el)
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement

            externalTrigger.click()

            expect(input.hidden).toBe(false)
        })

        it('still opens after an external trigger is replaced with a new element (e.g. a Livewire morph)', () => {
            const el = makeEl({ id: 'rename-folder-1', value: 'Photos' })
            const originalTrigger = document.createElement('button')
            originalTrigger.dataset.wireInlineEditTrigger = 'rename-folder-1'
            document.body.appendChild(originalTrigger)
            new InlineEdit(el)
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement

            // Simulate Livewire swapping the trigger node out for a new one
            // on an unrelated re-render, rather than mutating it in place.
            const replacementTrigger = document.createElement('button')
            replacementTrigger.dataset.wireInlineEditTrigger = 'rename-folder-1'
            originalTrigger.replaceWith(replacementTrigger)

            replacementTrigger.click()

            expect(input.hidden).toBe(false)
        })

        it('opens when a click lands on a child of the trigger', () => {
            const el = makeEl({ id: 'rename-folder-1', value: 'Photos' })
            const externalTrigger = document.createElement('button')
            externalTrigger.dataset.wireInlineEditTrigger = 'rename-folder-1'
            const icon = document.createElement('span')
            externalTrigger.appendChild(icon)
            document.body.appendChild(externalTrigger)
            new InlineEdit(el)
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement

            icon.click()

            expect(input.hidden).toBe(false)
        })
    })

    describe('committing', () => {
        it('dispatches inline-edit:save with the new value on Enter', () => {
            const el = makeEl({ id: 'name', value: 'Photos' })
            new InlineEdit(el)
            const listener = vi.fn()
            el.addEventListener('inline-edit:save', listener)
            const display = el.querySelector('[data-wire-inline-edit-display]') as HTMLElement
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement
            display.click()
            input.value = 'Screenshots'

            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

            expect(listener).toHaveBeenCalledOnce()
            expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: 'Screenshots' })
            expect(livewire.dispatch).toHaveBeenCalledOnce()
            expect(display.hidden).toBe(false)
            expect(input.hidden).toBe(true)
        })

        it('updates the display text itself, so it stays correct even if this element is never re-rendered by the server', () => {
            const el = makeEl({ id: 'name', value: 'Photos' })
            new InlineEdit(el)
            const display = el.querySelector('[data-wire-inline-edit-display]') as HTMLElement
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement
            display.click()
            input.value = 'Screenshots'

            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

            expect(display.textContent).toBe('Screenshots')
        })

        it('commits on blur too', () => {
            const el = makeEl({ id: 'name', value: 'Photos' })
            new InlineEdit(el)
            const listener = vi.fn()
            el.addEventListener('inline-edit:save', listener)
            const display = el.querySelector('[data-wire-inline-edit-display]') as HTMLElement
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement
            display.click()
            input.value = 'Screenshots'

            input.dispatchEvent(new FocusEvent('blur'))

            expect(listener).toHaveBeenCalledOnce()
        })

        it('does not dispatch when the value is unchanged', () => {
            const el = makeEl({ id: 'name', value: 'Photos' })
            new InlineEdit(el)
            const listener = vi.fn()
            el.addEventListener('inline-edit:save', listener)
            const display = el.querySelector('[data-wire-inline-edit-display]') as HTMLElement
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement
            display.click()

            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

            expect(listener).not.toHaveBeenCalled()
        })
    })

    describe('cancelling', () => {
        it('reverts the value and does not dispatch on Escape', () => {
            const el = makeEl({ id: 'name', value: 'Photos' })
            new InlineEdit(el)
            const listener = vi.fn()
            el.addEventListener('inline-edit:save', listener)
            const display = el.querySelector('[data-wire-inline-edit-display]') as HTMLElement
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement
            display.click()
            input.value = 'Screenshots'

            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

            expect(input.value).toBe('Photos')
            expect(display.hidden).toBe(false)
            expect(listener).not.toHaveBeenCalled()
        })

        it("does not let Escape bubble to an ancestor's own handler", () => {
            const el = makeEl({ id: 'name', value: 'Photos' })
            const ancestorHandler = vi.fn()
            document.body.addEventListener('keydown', ancestorHandler)
            new InlineEdit(el)
            const display = el.querySelector('[data-wire-inline-edit-display]') as HTMLElement
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement
            display.click()

            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

            expect(ancestorHandler).not.toHaveBeenCalled()
        })
    })

    describe('triggerOnClick disabled', () => {
        it('ignores a click on the display when it has no self-trigger attribute', () => {
            const el = makeEl({ value: 'Photos' })
            new InlineEdit(el)
            const display = el.querySelector('[data-wire-inline-edit-display]') as HTMLElement
            const input = el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement

            display.click()

            expect(input.hidden).toBe(true)
        })
    })
})
