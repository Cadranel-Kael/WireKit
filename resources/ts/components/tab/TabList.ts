import { Tab } from './Tab';

export class TabList {
    private tabs: Tab[] = [];
    private selectedTab: Tab | null = null;

    constructor(private el: HTMLElement) {
        const tabs = this.el.querySelectorAll('[data-wire-tab]') as NodeListOf<HTMLElement>;
        tabs.forEach((tab) => {
            this.tabs.push(new Tab(this, tab.dataset.wireTab!));
        });
        this.show(
            this.tabs.some((tab) => !tab.isDisabled()) ? this.tabs.find((tab) => !tab.isDisabled())! : this.tabs[0],
        );
        this.attachListeners();
    }

    public attachListeners() {
        this.el.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const currentIndex = this.tabs.indexOf(this.selectedTab!);
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const nextTab = this.findNextEnabledTab(currentIndex, direction);

                if (!nextTab) return;

                const currentTrigger = this.selectedTab!.getTrigger();
                const focusVisible = currentTrigger.matches(':focus-visible');

                this.show(nextTab, focusVisible);
            }
        });
    }

    private findNextEnabledTab(startIndex: number, direction: 1 | -1): Tab | null {
        if (this.tabs.length === 0) return null;

        let index = startIndex;
        for (let i = 0; i < this.tabs.length; i++) {
            index = (index + direction + this.tabs.length) % this.tabs.length;
            const candidate = this.tabs[index];
            if (!candidate.isDisabled()) return candidate;
        }

        return null;
    }

    public show(tab: Tab, focus = false) {
        this.tabs.forEach((t) => {
            const panel = t.getPanel();
            const trigger = t.getTrigger();
            if (t === tab) {
                this.selectedTab = tab;
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
