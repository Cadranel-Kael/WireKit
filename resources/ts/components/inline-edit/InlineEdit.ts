export class InlineEdit {
    private _display: HTMLElement;
    private _input: HTMLInputElement;
    private _originalValue: string;

    constructor(private _el: HTMLElement) {
        this._display = this._el.querySelector('[data-wire-inline-edit-display]') as HTMLElement;
        this._input = this._el.querySelector('[data-wire-inline-edit-input]') as HTMLInputElement;
        this._originalValue = this._input.value;

        // Delegated on document rather than addEventListener-per-trigger:
        // this component is commonly rendered `wire:ignore`d (see _commit()
        // below) so it survives Livewire re-renders on its own, but an
        // external trigger elsewhere in the DOM (e.g. a dropdown's "Rename"
        // item) usually isn't wire:ignore'd and gets a brand new element on
        // every morph. A listener bound to that specific node would go
        // stale the moment Livewire swaps it out; delegating means it
        // doesn't matter which node currently wears the attribute.
        document.addEventListener('click', this._handleDocumentClick);
        this._input.addEventListener('keydown', this._handleKeydown);
        this._input.addEventListener('blur', this._commit);
    }

    private _handleDocumentClick = (e: MouseEvent): void => {
        if (!this._el.id || !(e.target instanceof Element)) return;

        const trigger = e.target.closest(`[data-wire-inline-edit-trigger="${this._el.id}"]`);
        if (!trigger) return;

        e.preventDefault();
        this._open();
    };

    private _open(): void {
        this._originalValue = this._input.value;
        this._display.hidden = true;
        this._input.hidden = false;
        this._input.focus();
        this._input.select();
    }

    private _close(): void {
        this._display.hidden = false;
        this._input.hidden = true;
    }

    private _commit = (): void => {
        // Hiding the input (from _close(), called by either _commit or
        // _cancel) blurs it, which would otherwise re-enter here.
        if (this._input.hidden) return;

        const value = this._input.value;
        this._close();

        if (value === this._originalValue) return;

        // Consumers commonly render this component `wire:ignore`d (it's
        // meant to survive Livewire re-renders on its own, the same way
        // Modal/Tree do) -- so the display has to reflect the committed
        // value itself rather than waiting on a server round-trip that
        // may never touch this element again.
        this._display.textContent = value;
        this._originalValue = value;

        this._el.dispatchEvent(new CustomEvent('inline-edit:save', { detail: { value }, bubbles: true }));
        Livewire.dispatch(new CustomEvent('inline-edit:save', { detail: { value } }));
    };

    private _cancel = (): void => {
        this._input.value = this._originalValue;
        this._close();
    };

    private _handleKeydown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this._commit();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            // Stopped so an ancestor's own Escape handler (e.g. a
            // full-screen overlay closing itself) doesn't also fire.
            e.stopPropagation();
            this._cancel();
        }
    };

    public destroy(): void {
        document.removeEventListener('click', this._handleDocumentClick);
        this._input.removeEventListener('keydown', this._handleKeydown);
        this._input.removeEventListener('blur', this._commit);
    }
}
