import { Command, Params } from './types'
import { AnyExtension, Editor } from '@tiptap/core'
import { registry } from './registry'

export class Button {
    private readonly _command: string
    private readonly _params: Params
    private _triggerIcon: HTMLElement | null | undefined

    constructor(
        private readonly _el: HTMLElement,
        private readonly _onExecute: (command: string, params: Params) => void,
    ) {
        this._command = _el.dataset.command!
        this._params = this._resolveParams(_el)
        _el.addEventListener('click', this._handleClick)
        if (_el.dataset.icon) {
            this._triggerIcon = _el
                .closest('[data-wire-dropdown]')
                ?.querySelector(`[data-trigger-icon="${_el.dataset.icon}"]`)
        }
    }

    private _resolveParams(el: HTMLElement): Params {
        const params: Params = {}
        if (el.dataset.level) params.level = Number(el.dataset.level)
        if (el.dataset.align) params.alignment = el.dataset.align
        return params
    }

    private _handleClick = (): void => {
        this._onExecute(this._command, this._params)
    }

    get command() {
        return this._command
    }

    get params(): Params {
        return this._params
    }

    update(editor: Editor): void {
        const tool = registry[this._command]
        const isActive = tool?.isActive?.(editor, this._params) ?? false
        this._el.dataset.state = isActive ? 'active' : ''
        if (this._triggerIcon) {
            this._triggerIcon.style.display = isActive ? '' : 'none'
        }
    }

    destroy(): void {
        this._el.removeEventListener('click', this._handleClick)
    }
}
