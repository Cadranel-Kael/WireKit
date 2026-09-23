import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Input } from './Input'
import { Copyable } from './Copyable'

function makeInput(value = 'copy me'): {
    container: HTMLElement
    el: HTMLInputElement
    copyIcon: HTMLElement
    successIcon: HTMLElement
} {
    const container = document.createElement('div')
    container.dataset.wireInputContainer = ''

    const el = document.createElement('input')
    el.dataset.wireInput = ''
    el.value = value
    container.appendChild(el)

    const button = document.createElement('button')
    button.dataset.wireInputCopy = ''
    const copyIcon = document.createElement('span')
    copyIcon.dataset.wireInputCopyIcon = ''
    const successIcon = document.createElement('span')
    successIcon.dataset.wireInputCopySuccess = ''
    button.appendChild(copyIcon)
    button.appendChild(successIcon)
    container.appendChild(button)

    document.body.appendChild(container)
    return { container, el, copyIcon, successIcon }
}

let writeMock: ReturnType<typeof vi.fn>

beforeEach(() => {
    document.body.innerHTML = ''
    writeMock = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
        value: { write: writeMock },
        configurable: true,
    })
    vi.stubGlobal(
        'ClipboardItem',
        class {
            constructor(public data: unknown) {}
        },
    )
})

afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
})

describe('Copyable', () => {
    it('hides the success icon on init', () => {
        const { container, successIcon } = makeInput()
        new Copyable(new Input(container))

        expect(successIcon.style.display).toBe('none')
    })

    it('writes the input value to the clipboard when clicked', async () => {
        const { container } = makeInput('secret-value')
        new Copyable(new Input(container))
        const button = container.querySelector('[data-wire-input-copy]') as HTMLButtonElement

        button.click()
        await vi.waitFor(() => expect(writeMock).toHaveBeenCalledOnce())

        const clipboardItem = writeMock.mock.calls[0][0][0]
        expect(clipboardItem.data['text/plain']).toBe('secret-value')
    })

    it('swaps to the success icon after a successful copy', async () => {
        const { container, copyIcon, successIcon } = makeInput()
        new Copyable(new Input(container))
        const button = container.querySelector('[data-wire-input-copy]') as HTMLButtonElement

        button.click()
        await vi.waitFor(() => expect(successIcon.style.display).toBe('block'))

        expect(copyIcon.style.display).toBe('none')
    })

    it('reverts to the copy icon after the success timeout', async () => {
        vi.useFakeTimers()
        const { container, copyIcon, successIcon } = makeInput()
        new Copyable(new Input(container))
        const button = container.querySelector('[data-wire-input-copy]') as HTMLButtonElement

        button.click()
        await vi.advanceTimersByTimeAsync(0)
        expect(successIcon.style.display).toBe('block')

        await vi.advanceTimersByTimeAsync(2000)

        expect(successIcon.style.display).toBe('none')
        expect(copyIcon.style.display).toBe('block')
    })
})
