export class Dropdown {
    private _items: HTMLElement[] = []

    constructor(private _el: HTMLElement) {
        this._el.addEventListener('mouseover', this._handleMouseOver)
        this._el.addEventListener('keydown', this._handleKeydown)
        this._refreshItems()
    }

    private _refreshItems(): void {
        this._items = Array.from(
            this._el.querySelectorAll<HTMLElement>('[data-wire-menu-item]:not([aria-disabled="true"])'),
        )
    }

    private _handleMouseOver = (e: MouseEvent): void => {
        if (!(e.target instanceof HTMLElement)) return

        const item = e.target.closest<HTMLElement>('[data-wire-menu-item]')
        if (item) item.focus({ preventScroll: true })
    }

    private _handleKeydown = (e: KeyboardEvent): void => {
        this._refreshItems()
        if (this._items.length === 0) return

        const active = document.activeElement as HTMLElement
        const currentIndex = this._items.indexOf(active)

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                this._items[(currentIndex + 1) % this._items.length].focus()
                break
            case 'ArrowUp':
                e.preventDefault()
                this._items[(currentIndex - 1 + this._items.length) % this._items.length].focus()
                break
            case 'Home':
                e.preventDefault()
                this._items[0].focus()
                break
            case 'End':
                e.preventDefault()
                this._items[this._items.length - 1].focus()
                break
            case 'ArrowRight': {
                const targetId = active?.dataset.wireSubmenuTarget
                if (!targetId) return
                e.preventDefault()
                const submenu = document.getElementById(targetId)
                submenu?.showPopover()
                submenu?.querySelector<HTMLElement>('[data-wire-menu-item]')?.focus()
                break
            }
        }
    }

    public destroy(): void {
        this._el.removeEventListener('mouseover', this._handleMouseOver)
        this._el.removeEventListener('keydown', this._handleKeydown)
    }
}
