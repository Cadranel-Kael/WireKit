import { beforeEach, describe, expect, it } from 'vitest'
import { Input } from './Input'
import { Clearable } from './Clearable'

function makeInput(initialValue = ''): { container: HTMLElement; el: HTMLInputElement } {
    const container = document.createElement('div')
    container.dataset.wireInputContainer = ''

    const el = document.createElement('input')
    el.dataset.wireInput = ''
    el.value = initialValue
    container.appendChild(el)

    const button = document.createElement('button')
    button.dataset.wireInputClear = ''
    container.appendChild(button)

    document.body.appendChild(container)
    return { container, el }
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Clearable', () => {
    describe('initial visibility', () => {
        it('hides the clear button when the input is empty', () => {
            const { container } = makeInput('')
            new Clearable(new Input(container))

            const button = container.querySelector('[data-wire-input-clear]') as HTMLElement
            expect(button.style.display).toBe('none')
        })

        it('shows the clear button when the input already has a value', () => {
            const { container } = makeInput('hello')
            new Clearable(new Input(container))

            const button = container.querySelector('[data-wire-input-clear]') as HTMLElement
            expect(button.style.display).toBe('block')
        })
    })

    describe('typing', () => {
        it('shows the clear button once text is entered', () => {
            const { container, el } = makeInput('')
            new Clearable(new Input(container))
            const button = container.querySelector('[data-wire-input-clear]') as HTMLElement

            el.value = 'a'
            el.dispatchEvent(new Event('input'))

            expect(button.style.display).toBe('block')
        })

        it('hides the clear button once the input is emptied', () => {
            const { container, el } = makeInput('a')
            new Clearable(new Input(container))
            const button = container.querySelector('[data-wire-input-clear]') as HTMLElement

            el.value = ''
            el.dispatchEvent(new Event('input'))

            expect(button.style.display).toBe('none')
        })
    })

    describe('clicking the clear button', () => {
        it('empties the input value', () => {
            const { container, el } = makeInput('hello')
            new Clearable(new Input(container))
            const button = container.querySelector('[data-wire-input-clear]') as HTMLButtonElement

            button.click()

            expect(el.value).toBe('')
        })

        it('hides itself after clearing', () => {
            const { container } = makeInput('hello')
            new Clearable(new Input(container))
            const button = container.querySelector('[data-wire-input-clear]') as HTMLButtonElement

            button.click()

            expect(button.style.display).toBe('none')
        })

        it('focuses the input after clearing', () => {
            const { container, el } = makeInput('hello')
            new Clearable(new Input(container))
            const button = container.querySelector('[data-wire-input-clear]') as HTMLButtonElement

            button.click()

            expect(document.activeElement).toBe(el)
        })
    })
})
