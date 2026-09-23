import { beforeEach, describe, expect, it } from 'vitest'
import { Input } from './Input'
import { initInputs } from './initInputs'

function makeInputEl(container: HTMLElement = document.body): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireInputContainer = ''

    const input = document.createElement('input')
    input.dataset.wireInput = ''
    el.appendChild(input)

    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initInputs()', () => {
    it('returns an empty array when no inputs are on the page', () => {
        const result = initInputs()

        expect(result).toEqual([])
    })

    it('returns one Input per [data-wire-input-container] element', () => {
        makeInputEl()
        makeInputEl()

        const result = initInputs()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(Input)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeInputEl(root)
        makeInputEl(document.body)

        const result = initInputs(root)

        expect(result).toHaveLength(1)
    })

    it('defaults to document as root', () => {
        makeInputEl()

        const result = initInputs(document)

        expect(result).toHaveLength(1)
    })
})
