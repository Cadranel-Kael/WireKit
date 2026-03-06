import { Menu } from './Menu';

export class MenuItem {
    private _isActive = false;
    private _isSubOpen = false;
    private _el: HTMLElement;
    private _menu: Menu;
    private _subMenu?: Menu;

    constructor(el: HTMLElement, menu: Menu, subMenu?: Menu) {
        this._el = el;
        this._menu = menu;
        this._subMenu = subMenu;
        this.sync();
    }

    get el() {
        return this._el;
    }

    get menu() {
        return this._menu;
    }

    get subMenu() {
        return this._subMenu;
    }

    get index(): number {
        return this._menu.getIndex(this);
    }

    setActive(value: boolean, subMenu?: boolean) {
        if (this._isActive === value) return;

        this._isActive = value;

        if (subMenu && this._subMenu) {
            this._isSubOpen = value;
        }

        this.sync();
    }

    focus() {
        this._el.focus();
    }

    openSub() {
        if (!this._subMenu || this._isSubOpen) return;
        this._isSubOpen = true;
        this.sync();
    }

    hasSubmenu(): boolean {
        return !!this._subMenu;
    }

    closeSub() {
        if (!this._subMenu || !this._isSubOpen) return;
        this._isSubOpen = false;
        this.sync();
    }

    private sync() {
        this._el.tabIndex = this._isActive ? 0 : -1;

        if (this._isActive) {
            this._el.dataset.active = '';
        } else {
            delete this._el.dataset.active;
            this._el.blur();
        }

        if (this._subMenu) {
            if (this._isSubOpen) {
                this._subMenu.el.style.display = 'block';
            } else {
                this._subMenu.el.style.display = 'none';
                if (this._subMenu.hasSubmenus()) {
                    this._subMenu.closeSubMenus();
                }
            }
        }
    }
}
