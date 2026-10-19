import { autoUpdate, computePosition, flip, offset, type Placement } from '@floating-ui/dom'

export class Dropdown {
    private _items: HTMLElement[] = []
    private _stopAutoUpdate = new Map<HTMLElement, () => void>()

    constructor(private _el: HTMLElement) {
        this._el.addEventListener('mouseover', this._handleMouseOver)
        this._el.addEventListener('keydown', this._handleKeydown)
        // The popover `toggle` event does not bubble, so a single delegated
        // listener in the capture phase catches toggles from any menu inside
        // the root -- including a fresh menu element after a Livewire morph
        // swaps the old one out (which happens when the dropdown has no
        // explicit id/wire:key, so the per-render uniqid() changes the
        // menu's DOM id each render).
        this._el.addEventListener('toggle', this._handlePopoverToggle, true)
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

        const newState = (e as Event & { newState?: string }).newState
        if (newState === 'closed') {
            this._release(target)
            return
        }
        if (newState !== 'open') return

        // Look up the trigger fresh from the DOM -- after a morph the old
        // trigger element is detached and a new one (with a new id) is in
        // its place, so we can't cache the reference.
        const trigger = this._el.querySelector<HTMLElement>(`[popovertarget="${target.id}"]`)
        if (!trigger) return

        const placement = (target.dataset.wirePlacement as Placement) || 'bottom-start'

        // The menu is `position: fixed`, so it must be re-anchored whenever
        // the trigger moves (page or ancestor scroll, resize). It stays
        // invisible until the first position lands so it doesn't flash at
        // the viewport origin.
        this._release(target)
        this._stopAutoUpdate.set(
            target,
            autoUpdate(trigger, target, () => {
                computePosition(trigger, target, {
                    strategy: 'fixed',
                    placement,
                    middleware: [offset(4), flip()],
                }).then(({ x, y }) => {
                    Object.assign(target.style, { left: `${x}px`, top: `${y}px` })
                    target.setAttribute('data-wire-positioned', '')
                })
            }),
        )
    }

    private _release(target: HTMLElement): void {
        this._stopAutoUpdate.get(target)?.()
        this._stopAutoUpdate.delete(target)
        target.removeAttribute('data-wire-positioned')
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
        this._el.removeEventListener('toggle', this._handlePopoverToggle, true)
        this._stopAutoUpdate.forEach((stop) => stop())
        this._stopAutoUpdate.clear()
    }
}
