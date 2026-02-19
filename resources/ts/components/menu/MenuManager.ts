import { Menu } from './Menu';
import { MenuController } from './MenuController';

/**
 * Singleton class that manages all menus and menu controllers in the application.
 * Handles global keyboard and mouse interactions, coordinates menu visibility,
 * and tracks user interaction mode (keyboard vs mouse).
 */
export class MenuManager {
    private static instance: MenuManager | null = null;
    private controllers: Map<MenuController, boolean> = new Map();
    private menus: Menu[] = [];
    private interaction: 'mouse' | 'keyboard' = 'keyboard';

    constructor() {
        this.attachGlobalListeners();
    }

    /**
     * Registers a menu with the manager to enable global event handling.
     * Prevents duplicate registrations.
     * @param menu - The menu instance to register
     */
    public registerMenu(menu: Menu) {
        if (!this.menus.includes(menu)) {
            this.menus.push(menu);
        }
    }

    /**
     * Removes a menu from the manager's tracking.
     * @param menu - The menu instance to unregister
     */
    public unRegisterMenu(menu: Menu) {
        this.menus = this.menus.filter((m) => m !== menu);
    }

    /**
     * Registers a menu controller with the manager.
     * Initializes the controller's open state to false.
     * @param controller - The controller to register
     */
    public registerController(controller: MenuController) {
        if (!this.controllers.has(controller)) {
            this.controllers.set(controller, false);
        }
    }

    /**
     * Removes a controller from the manager's tracking.
     * @param controller - The controller to unregister
     */
    public unregisterController(controller: MenuController) {
        this.controllers.delete(controller);
    }

    /**
     * Shows a menu by making it visible and activating it.
     * Updates the controller's open state.
     * @param controller - The controller whose menu should be shown
     */
    public showMenu(controller: MenuController) {
        const menu = controller.getMenu();
        menu.getEl().style.display = 'block';
        this.controllers.set(controller, true);
        this.closeAllSubmenus(menu);

        menu.activate(-1);
    }

    /**
     * Hides a menu by making it invisible and deactivating it.
     * Also closes all submenus recursively.
     * @param controller - The controller whose menu should be hidden
     */
    public hideMenu(controller: MenuController) {
        const menu = controller.getMenu();
        menu.getEl().style.display = 'none';
        this.controllers.set(controller, false);

        menu.deactivate();
        this.closeAllSubmenus(menu);
    }

    /**
     * Checks if a menu controlled by the given controller is currently open.
     * @param controller - The controller to check
     * @returns True if the menu is open, false otherwise
     */
    public isMenuOpen(controller: MenuController): boolean {
        return this.controllers.get(controller) || false;
    }

    /**
     * Recursively closes all submenus within a given menu.
     * @param menu - The parent menu whose submenus should be closed
     */
    private closeAllSubmenus(menu: Menu) {
        menu.getItems().forEach((item) => {
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
    public static getInstance(): MenuManager {
        if (!MenuManager.instance) {
            MenuManager.instance = new MenuManager();
        }
        return MenuManager.instance;
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
        if (e.key === 'Escape') {
            this.closeAllControllers();
            return;
        }

        if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            return;
        }

        this.interaction = 'keyboard';

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
        this.interaction = 'mouse';

        const targetMenu = this.findActiveMenu(e.target as HTMLElement);
        if (!targetMenu) return;

        targetMenu.handleMouseOver(e);
    };

    private handleClickAway(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (Array.from(this.controllers.keys()).some((controller) => controller.containsElement(target))) return;

        this.closeAllControllers();
    }

    /**
     * Closes all open menu controllers.
     * Iterates through all registered controllers and calls their close method.
     */
    private closeAllControllers() {
        this.controllers.forEach((isOpen, controller) => {
            if (isOpen) controller.close();
        });
    }

    /**
     * Returns all registered menus.
     * @returns Array of all registered Menu instances
     */
    public getMenus() {
        return this.menus;
    }

    /**
     * Finds the menu that contains or is the given element.
     * @param activeElement - The element to search for
     * @returns The menu containing the element, or undefined if not found
     */
    private findActiveMenu(activeElement: HTMLElement) {
        return this.menus.find(
            (menu) => menu.getEl() === activeElement || menu.getEl() === activeElement.parentElement,
        );
    }

    /**
     * Sets the current interaction mode (mouse or keyboard).
     * @param mode - The interaction mode to set
     */
    setInteraction(mode: 'mouse' | 'keyboard') {
        this.interaction = mode;
    }

    /**
     * Gets the current interaction mode.
     * @returns The current interaction mode ('mouse' or 'keyboard')
     */
    getInteraction() {
        return this.interaction;
    }

    /**
     * Cleans up the manager by removing all global event listeners.
     * Should be called when the manager is no longer needed.
     */
    public destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('mouseover', this.handleMouseOver);
    }
}
