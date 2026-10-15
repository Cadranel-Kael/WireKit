/**
 * A native <dialog>-backed modal: opens via showModal()/close(), and dispatches
 * modal:before-open/open/before-close/close events around its native open/close transitions.
 */
export class Modal {
    constructor(private _el: HTMLDialogElement) {
        this.attachTargetListeners();
        this._modalAttrObserver.observe(this._el, { attributes: true });
        this._modalRemoveObserver.observe(document.body, { attributes: false, subtree: false, childList: true });
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
                    this.destroy();
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
        document.addEventListener('click', this.handleDocumentClick);
        Livewire.on('modal:close-all', () => {
            this._el.close();
        });
    }

    /**
     * Triggers and close buttons are wired through one delegated document
     * listener rather than per-element listeners: a Livewire morph can add
     * or replace a trigger at any time, and a node that first appears after
     * construction would otherwise stay dead. The <dialog> itself needs no
     * such treatment -- showModal()/close() work on whatever node currently
     * carries its markup.
     */
    private handleDocumentClick = (e: MouseEvent) => {
        if (!this._el.isConnected) return;

        const target = e.target;
        if (!(target instanceof Element)) return;

        if (target.closest(`[data-wire-modal-trigger="${this._el.id}"]`)) {
            this._el.showModal();
            return;
        }

        if (target.closest(`[data-wire-modal-close="${this._el.id}"]`)) {
            this._el.close();
        }
    };

    destroy() {
        document.removeEventListener('click', this.handleDocumentClick);
        this._el.removeEventListener('click', this._lightDismiss);
        this._el.removeEventListener('close', this._close);
        this._modalAttrObserver.disconnect();
        this._modalRemoveObserver.disconnect();
    }
}
