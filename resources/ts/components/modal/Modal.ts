export class Modal {
    private triggers!: NodeListOf<HTMLButtonElement>;
    private closeButtons!: NodeListOf<HTMLButtonElement>;

    constructor(private el: HTMLDialogElement) {
        this.initializeItems();
        this.attachTargetListeners();
    }

    private initializeItems() {
        this.triggers = document.querySelectorAll(
            `[data-wire-modal-trigger="${this.el.id}"]`,
        ) as NodeListOf<HTMLButtonElement>;
        this.closeButtons = document.querySelectorAll(
            `[data-wire-modal-close="${this.el.id}"]`,
        ) as NodeListOf<HTMLButtonElement>;
    }

    private attachTargetListeners() {
        this.triggers.forEach((trigger: HTMLButtonElement) => {
            trigger.addEventListener('click', () => {
                this.el.showModal();
            });
        });

        this.closeButtons.forEach((trigger: HTMLButtonElement) => {
            trigger.addEventListener('click', () => {
                this.el.close();
            });
        });

        this.el.addEventListener('click', this.handleClickAway);
    }

    private handleClickAway = (event: MouseEvent) => {
        const rect = this.el.getBoundingClientRect();
        const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
            this.el.close();
        }
    };
}
