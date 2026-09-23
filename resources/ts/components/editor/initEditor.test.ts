import { beforeEach, describe, expect, it } from 'vitest'
import { initEditor } from './initEditor'

function makeEditorEl(container: HTMLElement = document.body): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireEditor = ''

    const content = document.createElement('div')
    content.setAttribute('data-wire-editor-content', '')
    el.appendChild(content)

    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initEditor()', () => {
    it('does nothing when no [data-wire-editor] elements are on the page', () => {
        expect(() => initEditor()).not.toThrow()
    })

    it('initialises every [data-wire-editor] element as a tiptap editor', () => {
        const el = makeEditorEl()

        initEditor()

        expect(el.querySelector('.ProseMirror')).not.toBeNull()
    })

    it('initialises multiple editors on the page', () => {
        makeEditorEl()
        makeEditorEl()

        initEditor()

        expect(document.querySelectorAll('.ProseMirror')).toHaveLength(2)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeEditorEl(root)
        makeEditorEl()

        initEditor(root)

        expect(root.querySelectorAll('.ProseMirror')).toHaveLength(1)
        expect(document.querySelectorAll('.ProseMirror')).toHaveLength(1)
    })

    it('applies the prose classes to the editable content', () => {
        const el = makeEditorEl()

        initEditor()

        const prosemirror = el.querySelector('.ProseMirror') as HTMLElement
        expect(prosemirror.className).toContain('prose')
    })
})
