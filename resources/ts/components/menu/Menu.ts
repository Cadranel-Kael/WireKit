import { MenuItem } from './MenuItem';
import { MenuManager } from './MenuManager';

/**
 * Represents a menu with navigable items.
 * Handles keyboard and mouse navigation, submenu management, and focus control.
 */
export class Menu {
    private _items: MenuItem[] = [];
    private _activeIndex = -1;
    private readonly _el: HTMLElement;
    private _parentItem?: MenuItem;
    private readonly _manager?: MenuManager;

    /**
     * Creates a new Menu instance.
     * @param el - The HTML element representing the menu
     * @param parentItem - Optional parent menu item if this is a submenu
     * @param manager - Optional MenuManager instance for coordinating global interactions
     */
    constructor(el: HTMLElement, parentItem?: MenuItem, manager?: MenuManager) {
        this._el = el;
        this._parentItem = parentItem;
        this._manager = manager;
        this.initializeItems();
        this.attachTargetListeners();
    }

    private attachTargetListeners() {
        this._el.addEventListener('mouseleave', this.handleMouseLeave);
    }

    private handleMouseLeave = (e: MouseEvent) => {
        if (this._manager) {
            this._manager.interaction = 'mouse';
        }
        this.deactivate();
        this._items.forEach((item) => item.closeSub());
    };

    get el() {
        return this._el;
    }

    get items(): MenuItem[] {
        return this._items;
    }

    set parentItem(item: MenuItem) {
        this._parentItem = item;
    }

    getIndex(query: MenuItem): number {
        return this._items.findIndex((item) => item === query);
    }

    activateLast() {
        this.activate(this._items.length - 1);
    }

    activate(index: number) {
        if (index < 0 || index >= this._items.length) return;

        this._activeIndex = index;
        this.syncItemStates();

        const currentItem = this._items[index];
        currentItem.focus();

        this._items.forEach((item) => {
            if (item.menu.hasParentItem()) {
                item.menu.parentItem?.setActive(false);
            }
            if (item.hasSubmenu()) {
                item.closeSub();
            }
            if (this._manager?.interaction === 'mouse') {
                if (currentItem.hasSubmenu()) {
                    currentItem.openSub();
                }
            }
        });
    }

    hasSubmenus(): boolean {
        return this._items.some((item) => item.hasSubmenu());
    }

    closeSubMenus() {
        this._items.forEach((item) => {
            if (item.hasSubmenu()) {
                item.closeSub();
                if (item.subMenu?.hasSubmenus()) {
                    item.subMenu.closeSubMenus();
                }
            }
        });
    }

    hasParentItem(): boolean {
        return !!this._parentItem;
    }

    get parentItem(): MenuItem | undefined {
        return this._parentItem;
    }

    deactivate() {
        this._activeIndex = -1;
        this.syncItemStates();
    }

    /* -------------------------
       Event Handlers
    -------------------------- */

    handleMouseOver(e: MouseEvent) {
        const target = e.target as HTMLElement;

        const index = this._items.findIndex((item) => item.el.contains(target));

        if (index !== -1) {
            this.activate(index);
        } else {
            this.deactivate();
        }
    }

    handleKeyboardEvent(e: KeyboardEvent): boolean {
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
        const item = this._items[this._activeIndex];
        if (!item?.subMenu) return false;

        item.openSub();
        item.subMenu?.activate(0);

        return true;
    }

    private goToParent() {
        if (!this._parentItem) return false;

        const parentItem = this._parentItem;
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
        const elements = Array.from(this._el.querySelectorAll<HTMLElement>(':scope > [data-wire-menu-item]'));

        this._items = elements.map((el) => {
            const subEl = el.querySelector<HTMLElement>('[data-wire-menu]');
            const subMenu = subEl ? new Menu(subEl, undefined, this._manager) : undefined;
            const item = new MenuItem(el, this, subMenu);

            if (subMenu) subMenu.parentItem = item;

            return item;
        });

        const bounding = this._el.getBoundingClientRect();

        if (window.innerWidth <= bounding.x + bounding.width) {
            this._el.style.right = '100%';
            this._el.style.left = 'initial';
        }
    }

    private syncItemStates() {
        this._items.forEach((item, i) => {
            item.setActive(i === this._activeIndex);
        });
    }

    private nextIndex() {
        if (this._items.length <= 0) return -1;
        return (this._activeIndex + 1) % this._items.length;
    }

    private previousIndex() {
        if (this._items.length <= 0) return -1;
        return (this._activeIndex - 1 + this._items.length) % this._items.length;
    }
}
