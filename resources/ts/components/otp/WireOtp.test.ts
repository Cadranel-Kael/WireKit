import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import WireOtp from './WireOtp'

const TAG = 'wire-otp-test'

beforeAll(() => {
    customElements.define(TAG, WireOtp)
})

function makeOtp(length = 4): { el: WireOtp; boxes: HTMLInputElement[]; hidden: HTMLInputElement } {
    const el = document.createElement(TAG) as WireOtp

    const boxes: HTMLInputElement[] = []
    for (let i = 0; i < length; i++) {
        const box = document.createElement('input')
        box.setAttribute('data-wire-otp-box', String(i))
        box.readOnly = true
        el.appendChild(box)
        boxes.push(box)
    }

    const hidden = document.createElement('input')
    hidden.setAttribute('data-wire-otp-input', '')
    el.appendChild(hidden)

    document.body.appendChild(el)
    return { el, boxes, hidden }
}

function paste(box: HTMLInputElement, text: string) {
    const event = new Event('paste', { bubbles: true, cancelable: true })
    ;(event as any).clipboardData = { getData: () => text }
    box.dispatchEvent(event)
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('WireOtp', () => {
    describe('connectedCallback', () => {
        it('makes the first box editable and focusable', () => {
            const { boxes } = makeOtp()

            expect(boxes[0].readOnly).toBe(false)
            expect(boxes[0].tabIndex).toBe(1)
        })

        it('leaves the remaining boxes read-only', () => {
            const { boxes } = makeOtp()

            expect(boxes[1].readOnly).toBe(true)
            expect(boxes[2].readOnly).toBe(true)
        })
    })

    describe('typing (input event)', () => {
        it('advances focus and unlocks the next box when a digit is entered', () => {
            const { boxes } = makeOtp()

            boxes[0].value = '1'
            boxes[0].dispatchEvent(new Event('input', { bubbles: true }))

            expect(boxes[1].readOnly).toBe(false)
            expect(boxes[1].tabIndex).toBe(1)
        })

        it('does not unlock the next box when the value is empty', () => {
            const { boxes } = makeOtp()

            boxes[0].value = ''
            boxes[0].dispatchEvent(new Event('input', { bubbles: true }))

            expect(boxes[1].readOnly).toBe(true)
        })

        it('syncs the hidden input with the concatenated box values', () => {
            const { boxes, hidden } = makeOtp()

            boxes[0].value = '1'
            boxes[0].dispatchEvent(new Event('input', { bubbles: true }))
            boxes[1].readOnly = false
            boxes[1].value = '2'
            boxes[1].dispatchEvent(new Event('input', { bubbles: true }))

            expect(hidden.value).toBe('12')
        })

        it('dispatches an input event on the hidden field when synced', () => {
            const { boxes, hidden } = makeOtp()
            let fired = false
            hidden.addEventListener('input', () => (fired = true))

            boxes[0].value = '1'
            boxes[0].dispatchEvent(new Event('input', { bubbles: true }))

            expect(fired).toBe(true)
        })
    })

    describe('backspace', () => {
        it('clears the current box and shifts trailing values left when the box has a value', () => {
            const { boxes } = makeOtp()
            boxes[0].value = '1'
            boxes[1].readOnly = false
            boxes[1].value = '2'
            boxes[2].readOnly = false
            boxes[2].value = '3'

            boxes[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }))

            expect(boxes[1].value).toBe('3')
            expect(boxes[2].value).toBe('')
        })

        it('moves to the previous box and clears it when the current box is empty', () => {
            const { boxes } = makeOtp()
            boxes[0].value = '1'
            boxes[1].readOnly = false
            boxes[1].value = ''

            boxes[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }))

            expect(boxes[0].value).toBe('')
            expect(boxes[0].readOnly).toBe(false)
        })
    })

    describe('arrow navigation', () => {
        it('unlocks the previous box on ArrowLeft', () => {
            const { boxes } = makeOtp()
            boxes[1].readOnly = false

            boxes[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))

            expect(boxes[0].readOnly).toBe(false)
        })

        it('unlocks the next box on ArrowRight when the current box has a value', () => {
            const { boxes } = makeOtp()
            boxes[0].value = '1'

            boxes[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

            expect(boxes[1].readOnly).toBe(false)
        })

        it('does not unlock the next box on ArrowRight when the current box is empty', () => {
            const { boxes } = makeOtp()

            boxes[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

            expect(boxes[1].readOnly).toBe(true)
        })
    })

    describe('paste', () => {
        it('distributes pasted characters across the boxes starting at the focused one', () => {
            const { boxes } = makeOtp()

            paste(boxes[0], '1234')

            expect(boxes.map((b) => b.value)).toEqual(['1', '2', '3', '4'])
        })

        it('strips non-alphanumeric characters before distributing', () => {
            const { boxes } = makeOtp()

            paste(boxes[0], '12-34')

            expect(boxes.map((b) => b.value)).toEqual(['1', '2', '3', '4'])
        })

        it('does nothing when the pasted content has no usable characters', () => {
            const { boxes } = makeOtp()

            paste(boxes[0], '--')

            expect(boxes.map((b) => b.value)).toEqual(['', '', '', ''])
        })

        it('syncs the hidden input after pasting', () => {
            const { boxes, hidden } = makeOtp()

            paste(boxes[0], '1234')

            expect(hidden.value).toBe('1234')
        })

        it('truncates when the pasted content is longer than the remaining boxes', () => {
            const { boxes } = makeOtp()

            paste(boxes[2], '123456')

            expect(boxes.map((b) => b.value)).toEqual(['', '', '1', '2'])
        })
    })

    describe('click handling', () => {
        it('selects the box when it already has a value', () => {
            const { boxes } = makeOtp()
            boxes[0].value = '1'
            let selected = false
            boxes[0].select = () => (selected = true)

            boxes[0].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))

            expect(selected).toBe(true)
        })

        it('focuses the first empty box when clicking an empty box', () => {
            const { boxes } = makeOtp()
            boxes[0].value = '1'
            let focused = false
            boxes[1].focus = () => (focused = true)

            boxes[1].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))

            expect(focused).toBe(true)
        })
    })
})
