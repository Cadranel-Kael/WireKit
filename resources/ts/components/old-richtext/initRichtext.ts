import { Editor } from '@tiptap/core';
import { type Level } from '@tiptap/extension-heading';
import { resolveExtensions } from './extensions';
import { commands, isActiveChecks, type Params } from './commands';

export class Richtext {
    private _editor: Editor;
    private _wrapper: HTMLElement;
    private _linkInput: HTMLInputElement | null;

    constructor(wrapper: HTMLElement, editorEl: HTMLElement) {
        this._wrapper = wrapper;
        this._linkInput = wrapper.querySelector<HTMLInputElement>('[data-richtext-link-input]');

        const syncTextarea = wrapper.querySelector<HTMLTextAreaElement>('[data-richtext-sync]');

        this._editor = new Editor({
            element: editorEl,
            extensions: resolveExtensions(this._enabledCommands(), this._headingLevels(), this._alignments()),
            content: editorEl.innerHTML.trim(),
            editorProps: {
                attributes: { class: 'prose prose-sm sm:prose-base p-5 focus:outline-none' },
            },
        });

        this._bindCommands();
        this._bindLinkControls();

        this._editor.on('transaction', () => this._syncToolbar());
        this._editor.on('update', ({ editor }) => {
            if (!syncTextarea) return;
            syncTextarea.value = editor.getHTML();
            syncTextarea.dispatchEvent(new Event('input', { bubbles: true }));
        });
    }

    private _headingLevels(): Level[] {
        return [...this._wrapper.querySelectorAll<HTMLElement>('[data-command="heading"]')]
            .map((btn) => Number(btn.dataset.level))
            .filter(Boolean) as Level[];
    }

    private _alignments(): string[] {
        return [...this._wrapper.querySelectorAll<HTMLElement>('[data-command="align"]')]
            .map((btn) => btn.dataset.align)
            .filter((v): v is string => !!v);
    }

    private _enabledCommands(): string[] {
        return [...this._wrapper.querySelectorAll<HTMLElement>('[data-command]')].map((btn) => btn.dataset.command!);
    }

    private _paramsFor(btn: HTMLElement): Params {
        const params: Params = {};
        if (btn.dataset.level) params.level = Number(btn.dataset.level);
        if (btn.dataset.align) params.alignment = String(btn.dataset.align);
        return params;
    }

    private _bindCommands(): void {
        this._wrapper.querySelectorAll<HTMLElement>('[data-command]').forEach((btn) => {
            btn.addEventListener('click', () => {
                commands[btn.dataset.command!]?.(this._editor, this._paramsFor(btn));
            });
        });
    }

    private _bindLinkControls(): void {
        const linkConfirm = this._wrapper.querySelector<HTMLElement>('[data-richtext-link-confirm]');
        const linkUnlink = this._wrapper.querySelector<HTMLElement>('[data-richtext-link-unlink]');

        linkConfirm?.addEventListener('click', () => {
            const url = this._linkInput?.value.trim();
            this._editor
                .chain()
                .focus()
                .setLink({ href: url ?? '' })
                .run();
        });

        linkUnlink?.addEventListener('click', () => {
            this._editor.chain().focus().unsetLink().run();
        });
    }

    private _syncToolbar(): void {
        let activeStyleIcon = 'none';

        this._wrapper.querySelectorAll<HTMLElement>('[data-command]').forEach((btn) => {
            const cmd = btn.dataset.command!;
            const active = isActiveChecks[cmd]?.(this._editor, this._paramsFor(btn)) ?? false;

            btn.setAttribute('aria-pressed', String(active));
            btn.dataset.state = active ? 'active' : '';

            if (active && btn.dataset.styleIcon) {
                activeStyleIcon = btn.dataset.styleIcon;
            }
        });

        const styleTrigger = this._wrapper.querySelector('[data-richtext-style-trigger]');
        styleTrigger?.querySelectorAll<HTMLElement>('[data-style-icon]').forEach((icon) => {
            icon.classList.toggle('hidden', icon.dataset.styleIcon !== activeStyleIcon);
        });

        if (this._linkInput) {
            const href = this._editor.isActive('link') ? (this._editor.getAttributes('link').href ?? '') : '';
            if (this._linkInput.value !== href) {
                this._linkInput.value = href;
            }
        }
    }

    destroy(): void {
        this._editor.destroy();
    }
}

export function initRichtext(root: ParentNode = document): void {
    root.querySelectorAll<HTMLElement>('[data-wire-richtext-wrapper]').forEach((wrapper) => {
        if (wrapper.hasAttribute('data-richtext-initialized')) return;

        const editorEl = wrapper.querySelector<HTMLElement>('[data-wire-richtext]');
        if (!editorEl) return;

        wrapper.setAttribute('data-richtext-initialized', 'true');
        new Richtext(wrapper, editorEl);
    });
}
