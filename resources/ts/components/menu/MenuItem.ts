import { Menu } from './Menu';

export class MenuItem {
    private isActive = false;
    private isSubOpen = false;

    constructor(
        public el: HTMLElement,
        public menu: Menu,
        public subMenu?: Menu,
    ) {
        this.sync();
    }

    public getIndex(): number {
        return this.menu.getIndex(this);
    }

    setActive(value: boolean, subMenu?: boolean) {
        if (this.isActive === value) return;

        this.isActive = value;

        if (subMenu && this.subMenu) {
            this.isSubOpen = value;
        }

        this.sync();
    }

    public focus() {
        this.el.focus();
    }

    public openSub() {
        if (!this.subMenu || this.isSubOpen) return;
        this.isSubOpen = true;
        this.sync();
    }

    public hasSubmenu(): boolean {
        return !!this.subMenu;
    }

    public closeSub() {
        if (!this.subMenu || !this.isSubOpen) return;
        this.isSubOpen = false;
        this.sync();
    }

    private sync() {
        this.el.tabIndex = this.isActive ? 0 : -1;

        if (this.isActive) {
            this.el.dataset.active = '';
        } else {
            delete this.el.dataset.active;
            this.el.blur();
        }

        if (this.subMenu) {
            if (this.isSubOpen) {
                this.subMenu.getEl().style.display = 'block';
            } else {
                this.subMenu.getEl().style.display = 'none';
                if (this.subMenu.hasSubmenus()) {
                    this.subMenu.closeSubMenus();
                }
            }
        }
    }
}
