import { Menu } from '../menu/Menu';
import { MenuController } from '../menu/MenuController';
import { MenuManager } from '../menu/MenuManager';
import { uniqid } from '../../helpers/uniqid';

/**
 * Manages a dropdown menu interface with support for nested submenus.
 * Implements MenuController interface for integration with MenuManager.
 */
export class Dropdown implements MenuController {
    private menu!: Menu;
    private trigger!: HTMLButtonElement;
    private manager!: MenuManager;

    /**
     * Constructor
     *
     * Initializes the dropdown component by:
     * - Finding and validating menu and trigger elements in the DOM
     * - Creating a Menu instance
     * - Assigning unique IDs to menu and trigger for ARIA attributes
     * - Registering all menus (main and submenus) with the MenuManager
     * - Attaching event listeners
     * - Setting initial state (closed)
     *
     * @param el - The root element containing the dropdown menu and trigger
     */
    constructor(private el: HTMLElement) {
        this.initializeItems();
        this.attachTargetListeners();
        this.close(true);
    }

    /**
     * Recursively registers a menu and all its submenus with the MenuManager
     *
     * @param manager - The MenuManager instance to register menus with
     */
    private registerAllMenus(manager: MenuManager) {
        manager.registerMenu(this.menu);
        this.registerSubmenusRecursively(this.menu, manager);
    }

    /**
     * Recursively traverses menu items and registers any submenus found
     *
     * @param menu - The current menu being processed
     * @param manager - The MenuManager instance to register submenus with
     */
    private registerSubmenusRecursively(menu: Menu, manager: MenuManager) {
        menu.getItems().forEach((item) => {
            if (item.subMenu) {
                manager.registerMenu(item.subMenu);
                this.registerSubmenusRecursively(item.subMenu, manager);
            }
        });
    }

    /**
     * Returns the main Menu instance
     *
     * @returns The Menu object managed by this dropdown
     */
    getMenu(): Menu {
        return this.menu;
    }

    /**
     * Opens the dropdown menu
     *
     * Sets the menu to visible, focuses on it, updates ARIA attributes,
     * and dispatches a 'dropdown:open' event. Does nothing if already open.
     *
     * @param force - If true, forces the menu to open even if it is already open
     */
    public open(force: boolean = false): void {
        if (!force && this.isOpen()) return;

        this.manager.showMenu(this);
        this.menu.getEl().focus();
        this.trigger.setAttribute('aria-expanded', 'true');

        this.trigger.dispatchEvent(new CustomEvent('dropdown:open'));
    }

    /**
     * Closes the dropdown menu
     *
     * Hides the menu, updates ARIA attributes, and dispatches a 'dropdown:close' event.
     * Does nothing if already closed.
     *
     * @param force - If true, forces the menu to close even if it is already closed
     */
    public close(force: boolean = false): void {
        if (!force && !this.isOpen()) return;

        this.manager.hideMenu(this);
        this.trigger.setAttribute('aria-expanded', 'false');

        this.trigger.dispatchEvent(new CustomEvent('dropdown:close'));
    }

    /**
     * Checks if the dropdown menu is currently open
     *
     * @returns True if the menu is open, false otherwise
     */
    private isOpen(): boolean {
        return this.manager.isMenuOpen(this);
    }

    /**
     * Toggles the dropdown menu between open and closed states
     */
    private toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Checks if a given element is contained within this dropdown
     * (either in the menu or the trigger button)
     *
     * @param element - The element to check
     * @returns True if the element is part of this dropdown, false otherwise
     */
    containsElement(element: HTMLElement): boolean {
        return this.menu.getEl().contains(element) || this.trigger.contains(element);
    }

    /**
     * Destroys the dropdown component
     *
     * @throws Error - Currently not implemented
     */
    destroy(): void {
        this.manager.unregisterController(this);
    }

    /**
     * Handles keyboard navigation for the dropdown
     *
     * Supports:
     * - ArrowDown: Opens the menu and activates the first item
     * - ArrowUp: Opens the menu and activates the last item
     *
     * @param e - The keyboard event
     */
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

    /**
     * Attaches event listeners to the trigger element
     *
     * Listeners:
     * - click: Toggles the dropdown open/closed
     * - keydown: Handles keyboard navigation (ArrowUp, ArrowDown)
     */
    private attachTargetListeners() {
        this.trigger.addEventListener('click', () => {
            this.toggle();
        });

        this.trigger.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    /**
     * Initializes the menu items for this dropdown
     * - Finds the menu and trigger elements in the DOM
     * - Creates a Menu instance for the dropdown menu
     * - Assigns unique IDs to the menu and trigger for ARIA attributes
     * - Registers all menus (main and submenus) with the MenuManager
     * - Registers this dropdown as a controller with the MenuManager
     * @throws Error if the menu or trigger elements are not found in the DOM
     */
    private initializeItems() {
        this.manager = MenuManager.getInstance();

        const menuEl = this.el.querySelector('[data-wire-menu]') as HTMLElement;
        this.trigger = this.el.querySelector('[data-wire-dropdown-trigger]') as HTMLButtonElement;

        if (!menuEl || !this.trigger) {
            throw new Error('Dropdown menu or trigger element not found in the DOM');
        }

        this.menu = new Menu(menuEl, undefined, this.manager);

        const menuId = uniqid('menu-');
        const triggerId = uniqid('trigger-');

        this.trigger.setAttribute('aria-controls', menuId);
        this.trigger.setAttribute('id', triggerId);

        this.menu.getEl().setAttribute('id', menuId);
        this.menu.getEl().setAttribute('aria-labelledby', triggerId);

        this.registerAllMenus(this.manager);

        this.manager.registerController(this);
    }
}
