/**
 * Expando key under which a <dialog> stores its Modal instance. A JS expando
 * (rather than a data- attribute) survives Livewire morphing the dialog's
 * attributes in place, so initModals() can tell an already-initialized
 * dialog from a fresh one -- including one a morph swapped in mid-session.
 */
export const MODAL_INSTANCE_KEY = 'wireKitModal'

type ModalElement = HTMLDialogElement & { [MODAL_INSTANCE_KEY]?: Modal }

/**
 * A native <dialog>-backed modal: opens via showModal()/close(), and dispatches
 * modal:before-open/open/before-close/close events around its native open/close transitions.
 */
export class Modal {
    constructor(private _el: HTMLDialogElement) {
        (this._el as ModalElement)[MODAL_INSTANCE_KEY] = this
        this.attachTargetListeners();
        this._modalAttrObserver.observe(this._el, { attributes: true });
        this._modalRemoveObserver.observe(document.documentElement, { attributes: false, subtree: true, childList: true });
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

    // Watches the whole document, not just body's direct children: a morph
    // can drop a dialog from anywhere in the page -- nested inside a swapped
    // subtree, or with the <body> itself on wire:navigate -- and a stale
    // instance would otherwise keep its document click listener and its
    // modal:close-all subscription forever. The isConnected re-check ignores
    // nodes that were merely moved within the same mutation batch.
    private _modalRemoveObserver = new MutationObserver((mutations, observer) => {
        mutations.forEach(async (mutation) => {
            mutation.removedNodes.forEach((removedNode) => {
                if (removedNode.contains(this._el) && !this._el.isConnected) {
                    this.destroy();
                    this._el.dispatchEvent(new CustomEvent('modal:remove'));
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

    private _closeAllOff: (() => void) | undefined;

    private attachTargetListeners() {
        this._el.addEventListener('click', this._lightDismiss);
        this._el.addEventListener('close', this._close);
        document.addEventListener('click', this.handleDocumentClick, true);
        // Livewire.on() returns an unsubscribe function -- keep it so
        // destroy() can drop the subscription.
        this._closeAllOff = Livewire.on('modal:close-all', () => {
            this._el.close();
        });
    }

    /**
     * Triggers and close buttons are wired through one delegated document
     * listener rather than per-element listeners: a Livewire morph can add
     * or replace a trigger at any time, and a node that first appears after
     * construction would otherwise stay dead. The <dialog> itself needs no
     * such treatment -- showModal()/close() work on whatever node currently
     * carries its markup. It listens in the capture phase so a trigger whose
     * own handler calls stopPropagation() still works, and tears itself down
     * once the dialog is gone (a wire:navigate body swap never fires the
     * removal observer).
     */
    private handleDocumentClick = (e: MouseEvent) => {
        if (!this._el.isConnected) {
            this.destroy();
            return;
        }

        const target = e.target;
        if (!(target instanceof Element)) return;

        if (target.closest(`[data-wire-modal-trigger="${this._el.id}"]`)) {
            // Guard against double-handling: a stale instance whose node was
            // re-attached matches the same trigger id, and a second
            // showModal() on an already-open dialog throws InvalidStateError.
            if (!this._el.open) this._el.showModal();
            return;
        }

        if (target.closest(`[data-wire-modal-close="${this._el.id}"]`)) {
            this._el.close();
        }
    };

    destroy() {
        document.removeEventListener('click', this.handleDocumentClick, true);
        this._el.removeEventListener('click', this._lightDismiss);
        this._el.removeEventListener('close', this._close);
        this._closeAllOff?.();
        this._modalAttrObserver.disconnect();
        this._modalRemoveObserver.disconnect();
        // Drop the stored instance so the element can be re-initialized if
        // it ever lands back in the DOM.
        delete (this._el as ModalElement)[MODAL_INSTANCE_KEY];
    }
}
