import { Menu } from '../menu/Menu';
import { MenuController } from '../menu/MenuController';
import { MenuManager } from '../menu/MenuManager';

export class Dropdown implements MenuController {
    private menu: Menu;
    private trigger: HTMLButtonElement;
    private manager: MenuManager;

    constructor(private el: HTMLElement) {
        this.manager = MenuManager.getInstance();

        const menuEl = this.el.querySelector('[data-wire-menu]') as HTMLElement;
        this.trigger = this.el.querySelector('[data-wire-dropdown-trigger]') as HTMLButtonElement;

        if (!menuEl || !this.trigger) {
            console.warn('Dropdown menu or trigger not found:', { menuEl, triggerEl: this.trigger });
        }

        this.menu = new Menu(menuEl, undefined, this.manager);

        this.trigger.addEventListener('click', () => {
            this.toggle();
        });

        this.registerAllMenus(this.manager);

        this.manager.registerController(this);

        this.close();
    }

    private registerAllMenus(manager: MenuManager) {
        manager.registerMenu(this.menu);
        this.registerSubmenusRecursively(this.menu, manager);
    }

    private registerSubmenusRecursively(menu: Menu, manager: MenuManager) {
        menu.getItems().forEach((item) => {
            if (item.subMenu) {
                manager.registerMenu(item.subMenu);
                this.registerSubmenusRecursively(item.subMenu, manager);
            }
        });
    }

    getMenu(): Menu {
        return this.menu;
    }

    public open(): void {
        if (this.isOpen()) return;

        this.manager.showMenu(this);
        this.menu.getEl().focus();
        this.trigger.setAttribute('aria-expanded', 'true');

        this.trigger.dispatchEvent(new CustomEvent('dropdown:open'));
    }

    public close(): void {
        if (!this.isOpen) return;

        this.manager.hideMenu(this);
        this.trigger.setAttribute('aria-expanded', 'false');

        this.trigger.dispatchEvent(new CustomEvent('dropdown:close'));
    }

    private isOpen(): boolean {
        return this.manager.isMenuOpen(this);
    }

    private toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    containsElement(element: HTMLElement): boolean {
        return this.menu.getEl().contains(element) || this.trigger.contains(element);
    }

    destroy(): void {
        throw new Error('Method not implemented.');
    }
}
