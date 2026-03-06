import { Menu } from './Menu';
import { MenuController } from './MenuController';

/**
 * Singleton class that manages all menus and menu controllers in the application.
 * Handles global keyboard and mouse interactions, coordinates menu visibility,
 * and tracks user interaction mode (keyboard vs mouse).
 */
export class MenuManager {
    private static _instance: MenuManager | null = null;
    private _controllers: Map<MenuController, boolean> = new Map();
    private _menus: Menu[] = [];
    private _interaction: 'mouse' | 'keyboard' = 'keyboard';

    constructor() {
        this.attachGlobalListeners();
    }

    /**
     * Registers a menu with the manager to enable global event handling.
     * Prevents duplicate registrations.
     * @param menu - The menu instance to register
     */
    registerMenu(menu: Menu) {
        if (!this._menus.includes(menu)) {
            this._menus.push(menu);
        }
    }

    /**
     * Removes a menu from the manager's tracking.
     * @param menu - The menu instance to unregister
     */
    unregisterMenu(menu: Menu) {
        this._menus = this._menus.filter((m) => m !== menu);
    }

    /**
     * Registers a menu controller with the manager.
     * Initializes the controller's open state to false.
     * @param controller - The controller to register
     */
    registerController(controller: MenuController) {
        if (!this._controllers.has(controller)) {
            this._controllers.set(controller, false);
        }
    }

    /**
     * Removes a controller from the manager's tracking.
     * @param controller - The controller to unregister
     */
    unregisterController(controller: MenuController) {
        this._controllers.delete(controller);
    }

    /**
     * Shows a menu by making it visible and activating it.
     * Updates the controller's open state.
     * @param controller - The controller whose menu should be shown
     */
    showMenu(controller: MenuController) {
        const menu = controller.menu;
        menu.el.style.display = 'block';
        menu.el.focus();
        this._controllers.set(controller, true);
        this.closeAllSubmenus(menu);

        menu.activate(-1);
    }

    /**
     * Hides a menu by making it invisible and deactivating it.
     * Also closes all submenus recursively.
     * @param controller - The controller whose menu should be hidden
     */
    hideMenu(controller: MenuController) {
        const menu = controller.menu;
        menu.el.style.display = 'none';
        this._controllers.set(controller, false);

        menu.deactivate();
        this.closeAllSubmenus(menu);
    }

    /**
     * Checks if a menu controlled by the given controller is currently open.
     * @param controller - The controller to check
     * @returns True if the menu is open, false otherwise
     */
    isMenuOpen(controller: MenuController): boolean {
        return this._controllers.get(controller) || false;
    }

    /**
     * Recursively closes all submenus within a given menu.
     * @param menu - The parent menu whose submenus should be closed
     */
    private closeAllSubmenus(menu: Menu) {
        menu.items.forEach((item) => {
            if (item.subMenu) {
                item.closeSub();
                this.closeAllSubmenus(item.subMenu);
            }
        });
    }

    /**
     * Returns the singleton instance of MenuManager.
     * Creates a new instance if one doesn't exist.
     * @returns The MenuManager singleton instance
     */
    static getInstance(): MenuManager {
        if (!MenuManager._instance) {
            MenuManager._instance = new MenuManager();
        }
        return MenuManager._instance;
    }

    /**
     * Attaches global event listeners for keyboard and mouse interactions.
     * Called during construction.
     */
    private attachGlobalListeners() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('mouseover', this.handleMouseOver);
        document.addEventListener('click', this.handleClickAway.bind(this));
    }

    /**
     * Handles global keydown events.
     * Processes Escape key to close all menus and arrow keys for navigation.
     * Sets interaction mode to keyboard when arrow keys are used.
     * @param e - The keyboard event
     */
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

    /**
     * Handles global mouseover events.
     * Sets interaction mode to mouse and delegates to the appropriate menu.
     * @param e - The mouse event
     */
    private handleMouseOver = (e: MouseEvent) => {
        this._interaction = 'mouse';

        const targetMenu = this.findActiveMenu(e.target as HTMLElement);
        if (!targetMenu) return;

        targetMenu.handleMouseOver(e);
    };

    /**
     * Handles global click events to detect clicks any menu controllers.
     * @param e
     * @private
     */
    private handleClickAway(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (Array.from(this._controllers.keys()).some((controller) => controller.containsElement(target))) return;

        this.closeAllControllers();
    }

    /**
     * Closes all open menu controllers.
     * Iterates through all registered controllers and calls their close method.
     */
    private closeAllControllers() {
        this._controllers.forEach((isOpen, controller) => {
            if (isOpen) controller.close();
        });
    }

    /**
     * Returns all registered menus.C
     * @returns Array of all registered Menu instances
     */
    get menus() {
        return this._menus;
    }

    /**
     * Finds the menu that contains or is the given element.
     * @param activeElement - The element to search for
     * @returns The menu containing the element, or undefined if not found
     */
    private findActiveMenu(activeElement: HTMLElement) {
        return this.menus.find((menu) => menu.el === activeElement || menu.el === activeElement.parentElement);
    }

    /**
     * Sets the current interaction mode (mouse or keyboard).
     * @param mode - The interaction mode to set
     */
    set interaction(mode: 'mouse' | 'keyboard') {
        this._interaction = mode;
    }

    /**
     * Gets the current interaction mode.
     * @returns The current interaction mode ('mouse' or 'keyboard')
     */
    get interaction() {
        return this._interaction;
    }

    /**
     * Cleans up the manager by removing all global event listeners.
     * Should be called when the manager is no longer needed.
     */
    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('mouseover', this.handleMouseOver);
        document.removeEventListener('click', this.handleClickAway.bind(this));
    }
}
