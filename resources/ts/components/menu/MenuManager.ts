import { Menu } from './Menu';
import { MenuController } from './MenuController';

/**
 * Singleton that coordinates every menu and menu controller on the page: global keyboard/mouse
 * interaction, menu visibility, and interaction-mode tracking (mouse vs. keyboard).
 */
export class MenuManager {
    private static _instance: MenuManager | null = null;
    private _controllers: Map<MenuController, boolean> = new Map();
    private _menus: Menu[] = [];
    private _interaction: 'mouse' | 'keyboard' = 'keyboard';

    constructor() {
        this.attachGlobalListeners();
    }

    registerMenu(menu: Menu) {
        if (!this._menus.includes(menu)) {
            this._menus.push(menu);
        }
    }

    unregisterMenu(menu: Menu) {
        this._menus = this._menus.filter((m) => m !== menu);
    }

    registerController(controller: MenuController) {
        if (!this._controllers.has(controller)) {
            this._controllers.set(controller, false);
        }
    }

    unregisterController(controller: MenuController) {
        this._controllers.delete(controller);
    }

    showMenu(controller: MenuController) {
        const menu = controller.menu;
        menu.el.style.display = 'block';
        menu.el.focus();
        this._controllers.set(controller, true);
        this.closeAllSubmenus(menu);

        menu.activate(-1);
    }

    hideMenu(controller: MenuController) {
        const menu = controller.menu;
        menu.el.style.display = 'none';
        this._controllers.set(controller, false);

        menu.deactivate();
        this.closeAllSubmenus(menu);
    }

    isMenuOpen(controller: MenuController): boolean {
        return this._controllers.get(controller) || false;
    }

    private closeAllSubmenus(menu: Menu) {
        menu.items.forEach((item) => {
            if (item.subMenu) {
                item.closeSub();
                this.closeAllSubmenus(item.subMenu);
            }
        });
    }

    static getInstance(): MenuManager {
        if (!MenuManager._instance) {
            MenuManager._instance = new MenuManager();
        }
        return MenuManager._instance;
    }

    private attachGlobalListeners() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('mouseover', this.handleMouseOver);
        document.addEventListener('click', this.handleClickAway);
    }

    private handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Tab') {
            this.closeAllControllers();
            return;
        }

        if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            return;
        }

        this._interaction = 'keyboard';

        const activeElement = document.activeElement;
        if (!activeElement) return;

        const targetMenu = this.findActiveMenu(activeElement as HTMLElement);
        if (!targetMenu) return;

        const handled = targetMenu.handleKeyboardEvent(e);

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    private handleMouseOver = (e: MouseEvent) => {
        this._interaction = 'mouse';

        const targetMenu = this.findActiveMenu(e.target as HTMLElement);
        if (!targetMenu) return;

        targetMenu.handleMouseOver(e);
    };

    private handleClickAway = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (Array.from(this._controllers.keys()).some((controller) => controller.containsElement(target))) return;

        this.closeAllControllers();
    };

    private closeAllControllers() {
        this._controllers.forEach((isOpen, controller) => {
            if (isOpen) controller.close();
        });
    }

    get menus() {
        return this._menus;
    }

    private findActiveMenu(activeElement: HTMLElement) {
        return this.menus.find((menu) => menu.el === activeElement || menu.el === activeElement.parentElement);
    }

    set interaction(mode: 'mouse' | 'keyboard') {
        this._interaction = mode;
    }

    get interaction() {
        return this._interaction;
    }

    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('mouseover', this.handleMouseOver);
        document.removeEventListener('click', this.handleClickAway);
    }
}
