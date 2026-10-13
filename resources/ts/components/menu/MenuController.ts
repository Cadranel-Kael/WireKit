import { Menu } from './Menu';

/**
 * Standardizes menu visibility, DOM interactions, and cleanup across the different kinds of menu
 * (dropdown, context menu, etc.) that MenuManager coordinates.
 */
export interface MenuController {
    get menu(): Menu;

    open(): void;

    close(): void;

    /**
     * Determine whether the given element lies within this menu's DOM tree.
     */
    containsElement(element: HTMLElement): boolean;

    destroy(): void;
}
