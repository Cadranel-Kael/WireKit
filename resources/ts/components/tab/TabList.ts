import { Tab } from './Tab';

export class TabList {
    private _tabs: Tab[] = [];
    private _selectedTab: Tab | null = null;

    constructor(private _el: HTMLElement) {
        const tabs = this._el.querySelectorAll('[data-wire-tab]') as NodeListOf<HTMLElement>;
        tabs.forEach((tab) => {
            this._tabs.push(new Tab(this, tab.dataset.wireTab!));
        });
        this.show(this._tabs.some((tab) => !tab.disabled) ? this._tabs.find((tab) => !tab.disabled)! : this._tabs[0]);
        this.attachListeners();
    }

    public attachListeners() {
        this._el.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const currentIndex = this._tabs.indexOf(this._selectedTab!);
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const nextTab = this.findNextEnabledTab(currentIndex, direction);

                if (!nextTab) return;

                const currentTrigger = this._selectedTab!.trigger;
                const focusVisible = currentTrigger.matches(':focus-visible');

                this.show(nextTab, focusVisible);
            }
        });
    }

    private findNextEnabledTab(startIndex: number, direction: 1 | -1): Tab | null {
        if (this._tabs.length === 0) return null;

        let index = startIndex;
        for (let i = 0; i < this._tabs.length; i++) {
            index = (index + direction + this._tabs.length) % this._tabs.length;
            const candidate = this._tabs[index];
            if (!candidate.disabled) return candidate;
        }

        return null;
    }

    public show(tab: Tab, focus = false) {
        this._tabs.forEach((t) => {
            const panel = t.panel;
            const trigger = t.trigger;
            if (t === tab) {
                this._selectedTab = tab;
                if (panel) {
                    panel.style.display = 'block';
                }
                trigger.setAttribute('aria-selected', 'true');
                trigger.dataset.state = 'active';
                trigger.tabIndex = 0;

                if (focus) trigger.focus();
            } else {
                if (panel) {
                    panel.style.display = 'none';
                }
                trigger.setAttribute('aria-selected', 'false');
                trigger.tabIndex = -1;
                trigger.dataset.state = 'inactive';
            }
        });
    }
}
