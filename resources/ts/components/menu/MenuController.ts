import { Menu } from './Menu';

/**
 * Interface for controlling menu behavior and lifecycle.
 * Provides a standardized way to manage menu visibility, DOM interactions, and cleanup.
 */
export interface MenuController {
    /**
     * Retrieves the Menu instance associated with this controller.
     * @returns The Menu instance being controlled
     */
    getMenu(): Menu;

    /**
     * Opens and displays the menu.
     * Should handle visibility, accessibility attributes, and any open animations.
     */
    open(): void;

    /**
     * Closes and hides the menu.
     * Should handle visibility, accessibility attributes, and any close animations.
     */
    close(): void;

    /**
     * Checks if a given HTML element is contained within this menu's DOM tree.
     * Useful for determining if clicks or events occurred inside the menu.
     * @param element - The HTML element to check
     * @returns True if the element is within the menu, false otherwise
     */
    containsElement(element: HTMLElement): boolean;

    /**
     * Cleans up the controller by removing event listeners and references.
     * Should be called when the menu is no longer needed to prevent memory leaks.
     */
    destroy(): void;
}
