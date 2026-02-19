import { MenuItem } from './MenuItem';
import { MenuManager } from './MenuManager';

/**
 * Represents a menu with navigable items.
 * Handles keyboard and mouse navigation, submenu management, and focus control.
 */
export class Menu {
    private items: MenuItem[] = [];
    private activeIndex = -1;

    /**
     * Creates a new Menu instance.
     * @param el - The HTML element representing the menu
     * @param parentItem - Optional parent menu item if this is a submenu
     * @param manager - Optional MenuManager instance for coordinating global interactions
     */
    constructor(
        private el: HTMLElement,
        private parentItem?: MenuItem,
        private manager?: MenuManager,
    ) {
        this.initializeItems();
        this.attachTargetListeners();
    }

    private attachTargetListeners() {
        this.el.addEventListener('mouseleave', this.handleMouseLeave);
    }

    private handleMouseLeave = (e: MouseEvent) => {
        this.manager?.setInteraction('mouse');
        this.deactivate();
        this.items.forEach((item) => item.closeSub());
    };

    public getEl() {
        return this.el;
    }

    public getItems(): MenuItem[] {
        return this.items;
    }

    public setParentItem(item: MenuItem) {
        this.parentItem = item;
    }

    public getIndex(query: MenuItem): number {
        return this.items.findIndex((item) => item === query);
    }

    public activate(index: number) {
        if (index < 0 || index >= this.items.length) return;

        this.activeIndex = index;
        this.syncItemStates();

        const currentItem = this.items[index];
        currentItem.focus();

        this.items.forEach((item) => {
            if (item.menu.hasParentItem()) {
                item.menu.getParentItem()?.setActive(false);
            }
            if (item.hasSubmenu()) {
                item.closeSub();
            }
            if (this.manager?.getInteraction() === 'mouse') {
                if (currentItem.hasSubmenu()) {
                    currentItem.openSub();
                }
            }
        });
    }

    public hasSubmenus(): boolean {
        return this.items.some((item) => item.hasSubmenu());
    }

    public closeSubMenus() {
        this.items.forEach((item) => {
            if (item.hasSubmenu()) {
                item.closeSub();
                if (item.subMenu?.hasSubmenus()) {
                    item.subMenu.closeSubMenus();
                }
            }
        });
    }

    public hasParentItem(): boolean {
        return !!this.parentItem;
    }

    /**
     * getParentItem
     */
    public getParentItem() {
        return this.parentItem;
    }

    public deactivate() {
        this.activeIndex = -1;
        this.syncItemStates();
    }

    /* -------------------------
       Event Handlers
    -------------------------- */

    public handleMouseOver(e: MouseEvent) {
        const target = e.target as HTMLElement;

        const index = this.items.findIndex((item) => item.el.contains(target));

        if (index !== -1) {
            this.activate(index);
        } else {
            this.deactivate();
        }
    }

    public handleKeyboardEvent(e: KeyboardEvent): boolean {
        switch (e.key) {
            case 'ArrowDown':
                this.activate(this.nextIndex());
                return true;

            case 'ArrowUp':
                this.activate(this.previousIndex());
                return true;

            case 'ArrowRight':
                return this.openSubMenu();

            case 'ArrowLeft':
                return this.goToParent();
        }

        return false;
    }

    /* -------------------------
       Navigation
    -------------------------- */

    private openSubMenu() {
        const item = this.items[this.activeIndex];
        if (!item?.subMenu) return false;

        item.openSub();
        item.subMenu?.activate(0);

        return true;
    }

    private goToParent() {
        if (!this.parentItem) return false;

        const parentItem = this.parentItem;
        const parentMenu = parentItem.menu;
        const index = parentMenu.getIndex(parentItem);

        parentItem.closeSub();
        parentMenu.activate(index);

        return true;
    }

    /* -------------------------
       Internal
    -------------------------- */

    private initializeItems() {
        const elements = Array.from(this.el.querySelectorAll<HTMLElement>(':scope > [data-wire-menu-item]'));

        this.items = elements.map((el) => {
            const subEl = el.querySelector<HTMLElement>('[data-wire-menu]');
            const subMenu = subEl ? new Menu(subEl, undefined, this.manager) : undefined;
            const item = new MenuItem(el, this, subMenu);

            if (subMenu) subMenu.setParentItem(item);

            return item;
        });

        const bounding = this.el.getBoundingClientRect();

        if (innerWidth <= bounding.x + bounding.width) {
            this.el.style.right = '100%';
            this.el.style.left = 'initial';
        }
    }

    private syncItemStates() {
        this.items.forEach((item, i) => {
            item.setActive(i === this.activeIndex);
        });
    }

    private nextIndex() {
        return (this.activeIndex + 1) % this.items.length;
    }

    private previousIndex() {
        return (this.activeIndex - 1 + this.items.length) % this.items.length;
    }
}
