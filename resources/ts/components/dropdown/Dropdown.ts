import { computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom'

export class Dropdown {
    private _items: HTMLElement[] = []

    constructor(private _el: HTMLElement) {
        this._el.addEventListener('mouseover', this._handleMouseOver)
        this._el.addEventListener('keydown', this._handleKeydown)
        // The popover `toggle` event bubbles, so a single delegated listener
        // on the root catches toggles from any menu inside it -- including
        // a fresh menu element after a Livewire morph swaps the old one out
        // (which happens when the dropdown has no explicit id/wire:key, so
        // the per-render uniqid() changes the menu's DOM id each render).
        this._el.addEventListener('toggle', this._handlePopoverToggle)
        this._refreshItems()
    }

    private _refreshItems(): void {
        this._items = Array.from(
            this._el.querySelectorAll<HTMLElement>('[data-wire-menu-item]:not([aria-disabled="true"])'),
        )
    }

    private _handlePopoverToggle = (e: Event): void => {
        const target = e.target
        if (!(target instanceof HTMLElement)) return
        if ((e as Event & { newState?: string }).newState !== 'open') return

        // Look up the trigger fresh from the DOM -- after a morph the old
        // trigger element is detached and a new one (with a new id) is in
        // its place, so we can't cache the reference.
        const trigger = this._el.querySelector<HTMLElement>(`[popovertarget="${target.id}"]`)
        if (!trigger) return

        const placement = (target.dataset.wirePlacement as Placement) || 'bottom-start'

        computePosition(trigger, target, {
            strategy: 'fixed',
            placement,
            middleware: [offset(4), flip(), shift({ padding: 8 })],
        }).then(({ x, y }) => {
            Object.assign(target.style, { left: `${x}px`, top: `${y}px` })
        })
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
        this._el.removeEventListener('toggle', this._handlePopoverToggle)
    }
}
