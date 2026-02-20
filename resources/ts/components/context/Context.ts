import { Menu } from '../menu/Menu';
import { MenuController } from '../menu/MenuController';
import { MenuManager } from '../menu/MenuManager';

/**
 * Context menu component that implements the MenuController interface.
 */
export class Context implements MenuController {
    private menu!: Menu;
    private manager!: MenuManager;
    private currentX: number = 0;
    private currentY: number = 0;

    /**
     * Constructor
     * @param el
     */
    constructor(private el: HTMLElement) {
        this.initializeItems();
        this.attachEventListeners();
        this.close();
    }

    public registerAllMenus(manager: MenuManager) {
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

    private isOpen() {
        return this.manager.isMenuOpen(this);
    }

    public getMenu(): Menu {
        return this.menu;
    }

    public open(e?: PointerEvent): void {
        if (this.isOpen()) return;
        e?.preventDefault();

        const rect = this.el.getBoundingClientRect();

        if (e?.clientX !== undefined && e.clientY !== undefined) {
            this.currentX = e.clientX - rect.left;
            this.currentY = e.clientY - rect.top;
        }

        this.positionMenu(this.currentX, this.currentY);
        this.manager.showMenu(this);
    }

    public close(force: boolean = false): void {
        if (!force && !this.isOpen()) return;

        this.manager.hideMenu(this);
    }

    public containsElement(element: HTMLElement): boolean {
        return this.menu.getEl().contains(element);
    }

    public destroy(): void {
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
        this.menu.getEl().style.top = `${y}px`;
        this.menu.getEl().style.left = `${x}px`;
    }

    private initializeItems() {
        this.manager = MenuManager.getInstance();

        this.menu = new Menu(this.el.querySelector('[wire-data-context-menu]') as HTMLElement, undefined, this.manager);
        this.registerAllMenus(this.manager);

        this.manager.registerController(this);
    }
}
