import { ToolbarController } from './ToolbarController'
import { EditorConfig } from './types'
import { Level } from '@tiptap/extension-heading'

export function initEditor(root: ParentNode = document): void {
    root.querySelectorAll('[data-wire-editor]').forEach((editorEl) => {
        const commands = [...editorEl.querySelectorAll<HTMLElement>('[data-command]')]

        new ToolbarController(editorEl as HTMLElement, {
            attributes: {
                class: 'prose prose-sm sm:prose-base p-5 focus:outline-none overflow-scroll max-w-none w-full',
            },
        })
    })
}
