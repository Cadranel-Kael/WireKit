export class Modal {
    private _triggers: NodeListOf<HTMLButtonElement>;
    private _closeButtons: NodeListOf<HTMLButtonElement>;
    private _el: HTMLDialogElement;

    constructor(el: HTMLDialogElement) {
        this._el = el;
        this._triggers = document.querySelectorAll(
            `[data-wire-modal-trigger="${this._el.id}"]`,
        ) as NodeListOf<HTMLButtonElement>;
        this._closeButtons = document.querySelectorAll(
            `[data-wire-modal-close="${this._el.id}"]`,
        ) as NodeListOf<HTMLButtonElement>;
        this.attachTargetListeners();
    }

    private attachTargetListeners() {
        this._triggers.forEach((trigger: HTMLButtonElement) => {
            trigger.addEventListener('click', () => {
                this._el.showModal();
            });
        });

        this._closeButtons.forEach((trigger: HTMLButtonElement) => {
            trigger.addEventListener('click', () => {
                this._el.close();
            });
        });

        this._el.addEventListener('click', this.handleClickAway);
    }

    private handleClickAway = (event: MouseEvent) => {
        const rect = this._el.getBoundingClientRect();
        const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
            this._el.close();
        }
    };
}
