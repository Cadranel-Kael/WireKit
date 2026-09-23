import { Tab } from './Tab'

export class TabGroup {
    private _tabs: Array<Tab>
    private readonly _id: string
    private _selectedTab: Tab | null = null

    constructor(private _el: HTMLElement) {
        this._id = this._el.id
        this._tabs = Array.from(this._el.querySelectorAll('[data-wire-tab]') as NodeListOf<HTMLElement>).map(
            (e) => new Tab(this, e.dataset.wireTab ?? ''),
        )
        this.show(this._tabs.find((t) => !t.disabled) ?? this._tabs[0])
    }

    get id() {
        return this._id
    }

    show(tab: Tab) {
        this._tabs.forEach((t: Tab) => {
            const panel = t.panel
            const trigger = t.trigger
            if (t === tab) {
                this._selectedTab = tab
                if (panel) {
                    panel.style.display = 'block'
                }
                trigger.setAttribute('aria-selected', 'true')
                trigger.dataset.state = 'active'
                trigger.tabIndex = 0

                // if (focus) trigger.focus()
            } else {
                if (panel) {
                    panel.style.display = 'none'
                }
                trigger.setAttribute('aria-selected', 'false')
                trigger.tabIndex = -1
                trigger.dataset.state = 'inactive'
            }
        })
    }
}
