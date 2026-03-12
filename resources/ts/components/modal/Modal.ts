export class Modal {
    private _triggers: NodeListOf<HTMLButtonElement>;
    private _closeButtons: NodeListOf<HTMLButtonElement>;

    constructor(private _el: HTMLDialogElement) {
        this._triggers = document.querySelectorAll(
            `[data-wire-modal-trigger="${this._el.id}"]`,
        ) as NodeListOf<HTMLButtonElement>;
        this._closeButtons = document.querySelectorAll(
            `[data-wire-modal-close="${this._el.id}"]`,
        ) as NodeListOf<HTMLButtonElement>;
        this.attachTargetListeners();
        this._modalAttrObserver.observe(this._el, { attributes: true });
        this._modalRemoveObserver.observe(document.body, { attributes: false, subtree: false, childList: true });
        this._el.removeAttribute('loading');
    }

    private _modalAttrObserver = new MutationObserver((mutations, observer) => {
        mutations.forEach(async (mutation) => {
            if (mutation.attributeName === 'open') {
                const modal = mutation.target as HTMLDialogElement;

                const isOpen = modal.hasAttribute('open');
                if (!isOpen) return;

                modal.removeAttribute('inert');

                const focusTarget = modal.querySelector('[autofocus]') as HTMLElement | null;
                focusTarget ? focusTarget.focus() : modal.querySelector('button')?.focus();

                this._el.dispatchEvent(new CustomEvent('modal:before-open'));
                Livewire.dispatch(new CustomEvent('modal:before-open'));
                await this.animationComplete();
                Livewire.dispatch(new CustomEvent('modal:open'));
                this._el.dispatchEvent(new CustomEvent('modal:open'));
            }
        });
    });

    private _modalRemoveObserver = new MutationObserver((mutations, observer) => {
        mutations.forEach(async (mutation) => {
            mutation.removedNodes.forEach((removedNode) => {
                if (removedNode === this._el) {
                    removedNode.removeEventListener('click', this._lightDismiss);
                    removedNode.removeEventListener('close', this._close);
                    this._modalAttrObserver.disconnect();
                    this._modalRemoveObserver.disconnect();
                    removedNode.dispatchEvent(new CustomEvent('modal:remove'));
                }
            });
        });
    });

    private _lightDismiss = ({ target: dialog }: { target: EventTarget | null }) => {
        if (dialog === this._el) {
            this._el.close('dismiss');
        }
    };

    private _close = async ({ target: dialog }: { target: EventTarget | null }) => {
        if (!(dialog instanceof HTMLDialogElement)) return;
        dialog.setAttribute('inert', '');
        dialog.dispatchEvent(new CustomEvent('modal:before-close'));
        dialog.setAttribute('closing', '');
        await this.animationComplete();
        dialog.removeAttribute('closing');
        dialog.dispatchEvent(new CustomEvent('modal:close'));
    };

    private async animationComplete(): Promise<void> {
        await Promise.allSettled(this._el.getAnimations().map((a) => a.finished));
    }

    private attachTargetListeners() {
        this._el.addEventListener('click', this._lightDismiss);
        this._el.addEventListener('close', this._close);

        this._triggers.forEach((trigger: HTMLButtonElement) => {
            trigger.addEventListener('click', () => this._el.showModal());
        });

        this._closeButtons.forEach((trigger: HTMLButtonElement) => {
            trigger.addEventListener('click', () => this._el.close());
        });
        Livewire.on('modal:close-all', () => {
            this._el.close();
        });
    }

    destroy() {
        this._el.removeEventListener('click', this._lightDismiss);
        this._el.removeEventListener('close', this._close);
        this._modalAttrObserver.disconnect();
        this._modalRemoveObserver.disconnect();

        this._triggers.forEach((trigger) => {
            trigger.replaceWith(trigger.cloneNode(true)); // removes listeners
        });
        this._closeButtons.forEach((button) => {
            button.replaceWith(button.cloneNode(true));
        });
    }
}
