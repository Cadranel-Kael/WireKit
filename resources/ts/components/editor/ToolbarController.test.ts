import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ToolbarController } from './ToolbarController'

function makeEditorEl(options: {
    withContent?: boolean
    withSync?: boolean
    initialHtml?: string
    buttons?: Array<{ command: string; level?: string }>
} = {}): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireEditor = ''

    ;(options.buttons ?? [{ command: 'bold' }]).forEach(({ command, level }) => {
        const btn = document.createElement('button')
        btn.dataset.command = command
        if (level !== undefined) btn.dataset.level = level
        el.appendChild(btn)
    })

    if (options.withContent ?? true) {
        const content = document.createElement('div')
        content.setAttribute('data-wire-editor-content', '')
        el.appendChild(content)
    }

    if (options.withSync) {
        const textarea = document.createElement('textarea')
        textarea.setAttribute('data-wire-editor-sync', '')
        textarea.value = options.initialHtml ?? '<p>hello</p>'
        el.appendChild(textarea)
    }

    document.body.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('ToolbarController', () => {
    describe('construction', () => {
        it('throws when there is no [data-wire-editor-content] element', () => {
            const el = makeEditorEl({ withContent: false })

            expect(() => new ToolbarController(el)).toThrow('No content to render')
        })

        it('constructs successfully with a content element', () => {
            const el = makeEditorEl()

            expect(() => new ToolbarController(el)).not.toThrow()
        })

        it('sets the initial button state to inactive when nothing is active', () => {
            const el = makeEditorEl()
            new ToolbarController(el)

            const boldBtn = el.querySelector('[data-command="bold"]') as HTMLElement
            expect(boldBtn.dataset.state).toBe('')
        })
    })

    describe('button clicks', () => {
        it('updates the button state after a command toggles a mark', () => {
            const el = makeEditorEl({ withSync: true, initialHtml: '<p>hello</p>' })
            new ToolbarController(el)
            const boldBtn = el.querySelector('[data-command="bold"]') as HTMLElement

            boldBtn.click()

            expect(boldBtn.dataset.state).toBe('active')
        })

        it('toggles back to inactive on a second click', () => {
            const el = makeEditorEl({ withSync: true, initialHtml: '<p>hello</p>' })
            new ToolbarController(el)
            const boldBtn = el.querySelector('[data-command="bold"]') as HTMLElement

            boldBtn.click()
            boldBtn.click()

            expect(boldBtn.dataset.state).toBe('')
        })
    })

    describe('textarea sync', () => {
        // Toggling a mark (e.g. bold) on a collapsed selection only changes tiptap's
        // "stored marks", not the document — that fires the `transaction` event (which
        // drives button state) but NOT `update` (which drives textarea sync). A command
        // that changes block structure, like `heading`, reliably fires `update` instead.
        it('writes the editor HTML to the sync textarea on update', () => {
            const el = makeEditorEl({
                withSync: true,
                initialHtml: '<p>hello</p>',
                buttons: [{ command: 'heading', level: '2' }],
            })
            new ToolbarController(el)
            const textarea = el.querySelector('[data-wire-editor-sync]') as HTMLTextAreaElement

            const headingBtn = el.querySelector('[data-command="heading"]') as HTMLElement
            headingBtn.click()

            expect(textarea.value).toContain('<h2>')
        })

        it('dispatches an input event on the sync textarea when the editor updates', () => {
            const el = makeEditorEl({
                withSync: true,
                initialHtml: '<p>hello</p>',
                buttons: [{ command: 'heading', level: '2' }],
            })
            new ToolbarController(el)
            const textarea = el.querySelector('[data-wire-editor-sync]') as HTMLTextAreaElement
            const onInput = vi.fn()
            textarea.addEventListener('input', onInput)

            const headingBtn = el.querySelector('[data-command="heading"]') as HTMLElement
            headingBtn.click()

            expect(onInput).toHaveBeenCalled()
        })

        it('does not attempt to sync when there is no sync textarea', () => {
            const el = makeEditorEl({ withSync: false })

            expect(() => new ToolbarController(el)).not.toThrow()
        })
    })

    describe('destroy()', () => {
        it('destroys the underlying tiptap editor', () => {
            const el = makeEditorEl()
            const controller = new ToolbarController(el)

            expect(() => controller.destroy()).not.toThrow()
        })

        it('stops updating button state after destroy', () => {
            const el = makeEditorEl()
            const controller = new ToolbarController(el)
            const boldBtn = el.querySelector('[data-command="bold"]') as HTMLElement

            controller.destroy()

            expect(() => boldBtn.click()).not.toThrow()
        })
    })

    describe('unknown commands', () => {
        it('warns and skips extensions for a command with no registry entry', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
            const el = makeEditorEl({ buttons: [{ command: 'not-a-real-command' }] })

            expect(() => new ToolbarController(el)).not.toThrow()
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('not-a-real-command'))

            warnSpy.mockRestore()
        })
    })
})
