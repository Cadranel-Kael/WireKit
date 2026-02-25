import { TabList } from './TabList';

export class Tab {
    private trigger!: HTMLButtonElement;
    private panel!: HTMLElement | null;
    private disabled: boolean = false;

    constructor(
        private list: TabList,
        private name: string,
    ) {
        this.initializeItems();
        this.attachTargetListeners();
    }

    private initializeItems() {
        const trigger = document.getElementById(`tab-${this.name}`) as HTMLButtonElement;
        const panel = document.getElementById(`panel-${this.name}`);
        this.disabled = trigger.disabled;

        this.trigger = trigger as HTMLButtonElement;
        this.panel = panel;
    }

    public isDisabled(): boolean {
        return this.disabled;
    }

    private attachTargetListeners() {
        this.trigger.addEventListener('click', this.handleClick);
    }

    public getPanel(): HTMLElement | null {
        return this.panel;
    }

    public getTrigger(): HTMLButtonElement {
        return this.trigger;
    }

    private handleClick = (e: MouseEvent) => {
        if (this.isDisabled()) {
            e.preventDefault();
            return;
        }
        this.list.show(this);
    };
}
