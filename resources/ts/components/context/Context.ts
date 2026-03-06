import { Menu } from '../menu/Menu';
import { MenuController } from '../menu/MenuController';
import { MenuManager } from '../menu/MenuManager';

/**
 * Context menu component that implements the MenuController interface.
 */
export class Context implements MenuController {
    private _menu!: Menu;
    private _manager!: MenuManager;
    private _currentX: number = 0;
    private _currentY: number = 0;

    /**
     * Constructor
     * @param el
     */
    constructor(private el: HTMLElement) {
        this.initializeItems();
        this.attachEventListeners();
        this.close();
    }

    registerAllMenus(manager: MenuManager) {
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

    private isOpen() {
        return this._manager.isMenuOpen(this);
    }

    get menu(): Menu {
        return this._menu;
    }

    open(e?: PointerEvent): void {
        if (this.isOpen()) return;
        e?.preventDefault();

        const rect = this.el.getBoundingClientRect();

        if (e?.clientX !== undefined && e.clientY !== undefined) {
            this._currentX = e.clientX - rect.left;
            this._currentY = e.clientY - rect.top;
        }

        this.positionMenu(this._currentX, this._currentY);
        this._manager.showMenu(this);
    }

    close(force: boolean = false): void {
        if (!force && !this.isOpen()) return;

        this._manager.hideMenu(this);
    }

    containsElement(element: HTMLElement): boolean {
        return this.menu.el.contains(element);
    }

    destroy(): void {
        throw new Error('Method not implemented.');
    }

    private attachEventListeners() {
        this.el.addEventListener('contextmenu', (e) => {
            this.open(e);
        });

        this.el.addEventListener('click', () => {
            this.close();
        });
    }

    private positionMenu(x: number, y: number) {
        this.menu.el.style.top = `${y}px`;
        this.menu.el.style.left = `${x}px`;
    }

    private initializeItems() {
        this._manager = MenuManager.getInstance();

        this._menu = new Menu(
            this.el.querySelector('[wire-data-context-menu]') as HTMLElement,
            undefined,
            this._manager,
        );
        this.registerAllMenus(this._manager);

        this._manager.registerController(this);
    }
}
