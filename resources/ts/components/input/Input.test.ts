import { beforeEach, describe, expect, it } from 'vitest'
import { Input } from './Input'

function makeContainer(feature?: 'clearable' | 'copyable' | 'revealable'): HTMLElement {
    const container = document.createElement('div')
    container.dataset.wireInputContainer = ''
    if (feature) container.dataset.wireFeature = feature

    const input = document.createElement('input')
    input.dataset.wireInput = ''
    container.appendChild(input)

    if (feature === 'clearable') {
        const button = document.createElement('button')
        button.dataset.wireInputClear = ''
        container.appendChild(button)
    }

    if (feature === 'revealable') {
        const button = document.createElement('button')
        button.dataset.wireInputReveal = ''
        const hide = document.createElement('span')
        hide.dataset.wireRevealHide = ''
        const show = document.createElement('span')
        show.dataset.wireRevealShow = ''
        button.appendChild(hide)
        button.appendChild(show)
        container.appendChild(button)
    }

    if (feature === 'copyable') {
        const button = document.createElement('button')
        button.dataset.wireInputCopy = ''
        const icon = document.createElement('span')
        icon.dataset.wireInputCopyIcon = ''
        const success = document.createElement('span')
        success.dataset.wireInputCopySuccess = ''
        button.appendChild(icon)
        button.appendChild(success)
        container.appendChild(button)
    }

    document.body.appendChild(container)
    return container
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Input', () => {
    describe('basic behaviour', () => {
        it('exposes the underlying input element', () => {
            const container = makeContainer()
            const input = new Input(container)

            expect(input.el.tagName).toBe('INPUT')
        })

        it('exposes the container element', () => {
            const container = makeContainer()
            const input = new Input(container)

            expect(input.container).toBe(container)
        })

        it('gets and sets the input value', () => {
            const container = makeContainer()
            const input = new Input(container)

            input.value = 'hello'

            expect(input.value).toBe('hello')
            expect(input.el.value).toBe('hello')
        })

        it('focuses the underlying input', () => {
            const container = makeContainer()
            const input = new Input(container)
            document.body.appendChild(container)

            input.focus()

            expect(document.activeElement).toBe(input.el)
        })
    })

    describe('feature wiring', () => {
        it('does not throw when no feature is set', () => {
            const container = makeContainer()

            expect(() => new Input(container)).not.toThrow()
        })

        it('wires up a Clearable when data-wire-feature is clearable', () => {
            const container = makeContainer('clearable')

            expect(() => new Input(container)).not.toThrow()
        })

        it('wires up a Revealable when data-wire-feature is revealable', () => {
            const container = makeContainer('revealable')

            expect(() => new Input(container)).not.toThrow()
        })

        it('wires up a Copyable when data-wire-feature is copyable', () => {
            const container = makeContainer('copyable')

            expect(() => new Input(container)).not.toThrow()
        })
    })
})
