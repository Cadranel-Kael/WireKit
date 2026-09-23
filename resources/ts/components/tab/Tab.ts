import { TabGroup } from './TabGroup'

export class Tab {
    private _trigger!: HTMLButtonElement
    private _panel!: HTMLElement | null
    private _disabled: boolean = false

    constructor(
        private _group: TabGroup,
        private _name: string,
    ) {
        this.initializeItems()
        this.attachTargetListeners()
    }

    private initializeItems() {
        const trigger = document.getElementById(`tab-${this._name}-${this._group.id}`) as HTMLButtonElement
        const panel = document.getElementById(`panel-${this._name}-${this._group.id}`)
        this._disabled = trigger.disabled

        this._trigger = trigger as HTMLButtonElement
        this._panel = panel
    }

    get disabled(): boolean {
        return this._disabled
    }

    attachTargetListeners() {
        this._trigger.addEventListener('click', this.handleClick)
    }

    get panel() {
        return this._panel
    }

    get trigger() {
        return this._trigger
    }

    private handleClick = (e: MouseEvent) => {
        if (this._disabled) {
            e.preventDefault()
            return
        }
        this._group.show(this)
    }

    destroy(): void {
        this._trigger.removeEventListener('click', this.handleClick)
    }
}
