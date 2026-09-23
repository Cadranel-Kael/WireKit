import { AnyExtension, command, Editor } from '@tiptap/core'
import { Button } from './Button'
import { CORE_COMMANDS, registry } from './registry'
import { Command, Params, ToolEntry } from './types'

export class ToolbarController {
    private _editor: Editor
    private _buttons: Button[] = []
    private _content: HTMLElement | null
    private _syncTextArea: HTMLTextAreaElement | null

    constructor(
        private _el: HTMLElement,
        attributes = {},
    ) {
        this._mountButtons()

        this._content = this._el.querySelector('[data-wire-editor-content]')

        if (!this._content) {
            throw new Error('No content to render')
        }

        this._syncTextArea = this._el.querySelector('[data-wire-editor-sync]')

        this._editor = new Editor({
            element: this._el,
            extensions: this._resolveExtensions(),
            editorProps: this._resolveAttributes(attributes),
            content: this._syncTextArea?.value.trim(),
        })

        this._buttons.forEach((b) => b.update(this._editor))

        this._editor.on('transaction', () => {
            this._buttons.forEach((b) => b.update(this._editor))
        })

        if (this._syncTextArea) {
            this._editor.on('update', ({ editor }) => {
                this._syncTextArea!.value = editor.getHTML()
                this._syncTextArea!.dispatchEvent(new Event('input', { bubbles: true }))
            })
        }
    }

    private _resolveAttributes(attributes: Record<string, string>) {
        const label = this._el.parentElement?.querySelector<HTMLElement>('[data-wire-label]')

        const a11y: Record<string, string> = {
            role: 'textbox',
            'aria-multiline': 'true',
        }

        if (this._el.parentElement?.hasAttribute('data-wire-field') && label && label.hasAttribute('for')) {
            if (!label.id) {
                label.id = `${label.getAttribute('for')}`
                label.removeAttribute('for')
            }

            a11y['aria-labelledby'] = label.id

            label.addEventListener('click', () => this._editor.commands.focus())
        }

        return { ...a11y, ...attributes }
    }

    private _resolveExtensions(): AnyExtension[] {
        const buttonCommands: { name: string; params?: Params }[] = this._buttons.map((b) => ({
            name: b.command,
            params: b.params,
        }))
        const coreCommands: { name: string; params?: Params }[] = CORE_COMMANDS.map((command) => ({ name: command }))
        const commands = Object.entries(
            Object.groupBy([...buttonCommands, ...coreCommands], (command) => command.name),
        ).map(([name, items]) => ({
            name,
            params: items?.flatMap((i) => (i.params ? [i.params] : [])) ?? [],
        }))
        const seen = new Set<AnyExtension>()
        const extensions: AnyExtension[] = []

        const add = (raw: ToolEntry['extension'] | undefined | null, paramsList: Params[] = []) => {
            if (!raw) return
            const resolved = typeof raw === 'function' ? raw(paramsList) : raw
            if (seen.has(resolved)) return
            seen.add(resolved)
            extensions.push(resolved)
        }

        commands.forEach(({ name, params }) => {
            const entry = registry[name]
            if (!entry) {
                console.warn(`Unknown command "${name}" — no registry entry`)
                return
            }

            add(entry.extension, params)
            entry.dependents?.forEach((dep) => add(dep))
        })

        return extensions
    }

    private _mountButtons(): void {
        this._el.querySelectorAll<HTMLElement>('[data-command]').forEach((el) => {
            this._buttons.push(
                new Button(el, (command, params) => {
                    registry[command]?.command?.(this._editor, params)
                }),
            )
        })
    }

    destroy(): void {
        this._buttons.forEach((b) => b.destroy())
        this._editor.destroy()
    }
}
