import { Menu } from '../menu/Menu';
import { MenuController } from '../menu/MenuController';
import { MenuManager } from '../menu/MenuManager';
import { uniqid } from '../../helpers/uniqid';

/**
 * Manages a dropdown menu interface with support for nested submenus.
 * Implements MenuController interface for integration with MenuManager.
 */
export class Dropdown implements MenuController {
    private _menu!: Menu;
    private _trigger!: HTMLButtonElement;
    private _manager!: MenuManager;

    constructor(private el: HTMLElement) {
        this.initializeItems();
        this.attachTargetListeners();
        this.close(true);
    }

    private registerAllMenus(manager: MenuManager) {
        manager.registerMenu(this.menu);
        this.registerSubmenusRecursively(this.menu, manager);
    }

    private registerSubmenusRecursively(menu: Menu, manager: MenuManager) {
        menu.items.forEach((item) => {
            if (item.subMenu) {
                manager.registerMenu(item.subMenu);
                this.registerSubmenusRecursively(item.subMenu, manager);
            }
        });
    }

    get menu(): Menu {
        return this._menu;
    }

    open(force: boolean = false): void {
        if (!force && this.isOpen()) return;

        this._manager.showMenu(this);
        this._trigger.setAttribute('aria-expanded', 'true');

        this._trigger.dispatchEvent(new CustomEvent('dropdown:open'));
    }

    close(force: boolean = false): void {
        if (!force && !this.isOpen()) return;

        this._manager.hideMenu(this);
        this._trigger.setAttribute('aria-expanded', 'false');

        this._trigger.dispatchEvent(new CustomEvent('dropdown:close'));
    }

    private isOpen(): boolean {
        return this._manager.isMenuOpen(this);
    }

    private toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    containsElement(element: HTMLElement): boolean {
        return this.menu.el.contains(element) || this._trigger.contains(element);
    }

    destroy(): void {
        this._manager.unregisterController(this);
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;

        e.stopPropagation();
        e.preventDefault();

        if (e.key === 'ArrowDown') {
            this.open();
            this.menu.activate(0);
        }

        if (e.key === 'ArrowUp') {
            this.open();
            this.menu.activateLast();
        }
    }

    private attachTargetListeners() {
        this._trigger.addEventListener('click', () => {
            this.toggle();
        });

        this._trigger.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    /**
     * @throws Error if the menu or trigger elements are not found in the DOM.
     */
    private initializeItems() {
        this._manager = MenuManager.getInstance();

        const menuEl = this.el.querySelector('[data-wire-menu]') as HTMLElement;
        this._trigger = this.el.querySelector('[data-wire-dropdown-trigger]') as HTMLButtonElement;

        if (!menuEl || !this._trigger) {
            throw new Error('Dropdown menu or trigger element not found in the DOM');
        }

        this._menu = new Menu(menuEl, undefined, this._manager);

        const menuId = uniqid('menu-');
        const triggerId = uniqid('trigger-');

        this._trigger.setAttribute('aria-controls', menuId);
        this._trigger.setAttribute('id', triggerId);

        this._menu.el.setAttribute('id', menuId);
        this._menu.el.setAttribute('aria-labelledby', triggerId);

        this.registerAllMenus(this._manager);

        this._manager.registerController(this);
    }
}
