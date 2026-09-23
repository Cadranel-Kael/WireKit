import { beforeEach, describe, expect, it } from 'vitest'
import { Input } from './Input'
import { Revealable } from './Revealable'

function makeInput(): { container: HTMLElement; el: HTMLInputElement; hideIcon: HTMLElement; showIcon: HTMLElement } {
    const container = document.createElement('div')
    container.dataset.wireInputContainer = ''

    const el = document.createElement('input')
    el.dataset.wireInput = ''
    el.type = 'password'
    container.appendChild(el)

    const button = document.createElement('button')
    button.dataset.wireInputReveal = ''
    const showIcon = document.createElement('span')
    showIcon.dataset.wireRevealShow = ''
    const hideIcon = document.createElement('span')
    hideIcon.dataset.wireRevealHide = ''
    button.appendChild(showIcon)
    button.appendChild(hideIcon)
    container.appendChild(button)

    document.body.appendChild(container)
    return { container, el, hideIcon, showIcon }
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Revealable', () => {
    describe('initial state', () => {
        it('forces the input to type=password on init', () => {
            const { container, el } = makeInput()
            new Revealable(new Input(container))

            expect(el.type).toBe('password')
        })

        it('shows the "show" icon and hides the "hide" icon', () => {
            const { container, hideIcon, showIcon } = makeInput()
            new Revealable(new Input(container))

            expect(showIcon.style.display).toBe('block')
            expect(hideIcon.style.display).toBe('none')
        })
    })

    describe('toggling', () => {
        it('reveals the value as text on first click', () => {
            const { container, el } = makeInput()
            new Revealable(new Input(container))
            const button = container.querySelector('[data-wire-input-reveal]') as HTMLButtonElement

            button.click()

            expect(el.type).toBe('text')
        })

        it('swaps the icons when revealed', () => {
            const { container, hideIcon, showIcon } = makeInput()
            new Revealable(new Input(container))
            const button = container.querySelector('[data-wire-input-reveal]') as HTMLButtonElement

            button.click()

            expect(hideIcon.style.display).toBe('block')
            expect(showIcon.style.display).toBe('none')
        })

        it('hides the value again on a second click', () => {
            const { container, el } = makeInput()
            new Revealable(new Input(container))
            const button = container.querySelector('[data-wire-input-reveal]') as HTMLButtonElement

            button.click()
            button.click()

            expect(el.type).toBe('password')
        })
    })
})
