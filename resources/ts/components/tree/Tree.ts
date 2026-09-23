import Sortable from 'sortablejs'
import { TreeItem } from './TreeItem'

/**
 * A nestable tree of items. Handles roving tabindex and keyboard
 * navigation (arrow keys, Home/End) between the currently visible items.
 * @class
 */
export class Tree {
    private readonly _el: HTMLElement
    private _items: TreeItem[] = []
    private _activeItem: TreeItem | undefined
    private readonly _sortable: boolean
    private readonly _nested: boolean
    private _sortableInstances: Sortable[] = []
    private _draggedEl: HTMLElement | undefined
    private _lastIndentX: number = 0

    /**
     * Create a tree.
     * @param el
     */
    constructor(el: HTMLElement) {
        this._el = el
        this._sortable = this._el.hasAttribute('data-wire-sortable')
        this._nested = this._el.hasAttribute('data-wire-nested')
        this.initializeItems()
        this._el.addEventListener('keydown', this.handleKeydown)
        this._el.addEventListener('focusin', this.handleFocusIn)
        this.syncTabIndex()
        if (this._sortable || this._nested) {
            this.initializeSortable()
        }
    }

    get el() {
        return this._el
    }

    get items() {
        return this._items
    }

    destroy() {
        this._el.removeEventListener('keydown', this.handleKeydown)
        this._el.removeEventListener('focusin', this.handleFocusIn)
        this._sortableInstances.forEach((s) => s.destroy())
        this._sortableInstances = []
        this._items.forEach((item) => item.destroy())
    }

    private initializeItems() {
        const nodes = Array.from(this._el.querySelectorAll<HTMLElement>('[data-wire-tree-item]'))
        this._items = nodes.map((node) => {
            const item = new TreeItem(node)
            item.onChange(() => this.syncTabIndex())
            return item
        })
    }

    private refreshItems() {
        this._items.forEach((item) => item.destroy())
        this._activeItem = undefined
        this.initializeItems()
        this.syncTabIndex()
    }

    private initializeSortable() {
        const lists: HTMLElement[] = [
            this._el,
            ...Array.from(this._el.querySelectorAll<HTMLElement>('[data-wire-tree-group]')),
        ]
        this._sortableInstances = lists.map((list) => this.makeSortable(list))
    }

    private makeSortable(list: HTMLElement): Sortable {
        const options: Sortable.Options = {
            animation: 150,
            forceFallback: true,
            fallbackOnBody: true,
            handle: '[data-wire-tree-handle]',
            ...(this._nested && { group: { name: 'wire-tree', pull: true, put: true } }),
            onStart: (evt) => {
                this._draggedEl = evt.item
                this._lastIndentX = 0
                this._items.find((i) => i.el === this._draggedEl)?.collapse()
                const row = evt.item.querySelector<HTMLElement>('[data-wire-tree-row]')
                if (row) row.dataset.state = 'dragging'
                if (this._nested) {
                    document.addEventListener('pointermove', this.handleDragPointerMove)
                }
            },
            onEnd: this.handleSortEnd,
        }
        return Sortable.create(list, options)
    }

    private handleSortEnd = (evt: Sortable.SortableEvent) => {
        document.removeEventListener('pointermove', this.handleDragPointerMove)
        this._draggedEl = undefined
        this._lastIndentX = 0

        const row = evt.item.querySelector<HTMLElement>('[data-wire-tree-row]')
        if (row) row.dataset.state = ''

        const { from, to } = evt

        if (from !== to) {
            // Expand the destination parent so the moved item is visible
            const destParentLi = to.parentElement
            if (destParentLi?.hasAttribute('data-wire-tree-item')) {
                destParentLi.dataset.wireExpanded = 'true'
                destParentLi.setAttribute('aria-expanded', 'true')
                to.style.display = ''
            }

            // Remove the source group if empty (never the root list)
            if (from !== this._el && from.children.length === 0) {
                const idx = this._sortableInstances.findIndex((s) => s.el === from)
                if (idx !== -1) {
                    this._sortableInstances[idx].destroy()
                    this._sortableInstances.splice(idx, 1)
                }
                const srcParentLi = from.parentElement as HTMLElement | null
                from.remove()
                if (srcParentLi) {
                    srcParentLi.removeAttribute('aria-expanded')
                    delete srcParentLi.dataset.wireExpanded
                }
            }
        }

        this._el.dispatchEvent(
            new CustomEvent('wire:tree:reorder', { bubbles: true, detail: { order: this.serializeOrder() } }),
        )
        Livewire.dispatch('wire:tree:reorder', { order: this.serializeOrder() })

        this.refreshItems()
    }

    private handleDragPointerMove = (e: PointerEvent) => {
        if (!this._draggedEl) return
        if (this._lastIndentX === 0) {
            this._lastIndentX = e.clientX
            return
        }
        const THRESHOLD = 40
        const delta = e.clientX - this._lastIndentX
        if (delta > THRESHOLD && this.indentDraggedItem(this._draggedEl)) {
            this._lastIndentX = e.clientX
        } else if (delta < -THRESHOLD && this.outdentDraggedItem(this._draggedEl)) {
            this._lastIndentX = e.clientX
        }
    }

    private indentDraggedItem(draggedEl: HTMLElement): boolean {
        const prevSibling = draggedEl.previousElementSibling
        if (!prevSibling?.hasAttribute('data-wire-tree-item')) return false

        let group = Array.from(prevSibling.children).find((c) => c.hasAttribute('data-wire-tree-group')) as
            | HTMLElement
            | undefined

        if (!group) {
            group = this.createGroup()
            prevSibling.appendChild(group)
            this._sortableInstances.push(this.makeSortable(group))
            ;(prevSibling as HTMLElement).dataset.wireExpanded = 'true'
            ;(prevSibling as HTMLElement).setAttribute('aria-expanded', 'true')
            group.style.display = ''
        }

        group.appendChild(draggedEl)
        return true
    }

    private outdentDraggedItem(draggedEl: HTMLElement): boolean {
        const currentGroup = draggedEl.parentElement
        if (!currentGroup?.hasAttribute('data-wire-tree-group')) return false

        const parentLi = currentGroup.parentElement
        if (!parentLi?.hasAttribute('data-wire-tree-item')) return false

        const grandparent = parentLi.parentElement
        if (!grandparent) return false

        grandparent.insertBefore(draggedEl, parentLi.nextSibling)

        if (currentGroup.children.length === 0) {
            const idx = this._sortableInstances.findIndex((s) => s.el === currentGroup)
            if (idx !== -1) {
                this._sortableInstances[idx].destroy()
                this._sortableInstances.splice(idx, 1)
            }
            currentGroup.remove()
            parentLi.removeAttribute('aria-expanded')
            delete (parentLi as HTMLElement).dataset.wireExpanded
        }

        return true
    }

    private createGroup(): HTMLElement {
        const group = document.createElement('ul')
        group.setAttribute('role', 'group')
        group.dataset.wireTreeGroup = ''
        const existing = this._el.querySelector<HTMLElement>('[data-wire-tree-group]')
        group.className = existing ? existing.className : 'ml-4 flex flex-col gap-0.5'
        return group
    }

    private visibleItems(): TreeItem[] {
        return this._items.filter((item) => this.isVisible(item))
    }

    private isVisible(item: TreeItem): boolean {
        let group = item.parentGroup
        while (group) {
            const parentEl = group.parentElement as HTMLElement | null
            const parentItem = this._items.find((i) => i.el === parentEl)
            if (parentItem && !parentItem.isExpanded) return false
            group = parentItem?.parentGroup ?? null
        }
        return true
    }

    private syncTabIndex() {
        const visible = this.visibleItems().filter((item) => !item.isDisabled)
        if (!visible.length) return

        if (!this._activeItem || !visible.includes(this._activeItem)) {
            this._activeItem = visible[0]
        }

        this._items.forEach((item) => {
            item.row.tabIndex = item === this._activeItem ? 0 : -1
        })
    }

    private handleFocusIn = (e: FocusEvent) => {
        const target = e.target as HTMLElement
        const item = this._items.find((i) => i.row === target)
        if (!item) return

        this._activeItem = item
        this.syncTabIndex()
    }

    private handleKeydown = (e: KeyboardEvent) => {
        const visible = this.visibleItems().filter((item) => !item.isDisabled)
        if (!this._activeItem || !visible.length) return

        const index = visible.indexOf(this._activeItem)

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                this.focusAt(visible, index + 1)
                return

            case 'ArrowUp':
                e.preventDefault()
                this.focusAt(visible, index - 1)
                return

            case 'Home':
                e.preventDefault()
                this.focusAt(visible, 0)
                return

            case 'End':
                e.preventDefault()
                this.focusAt(visible, visible.length - 1)
                return

            case 'ArrowRight':
                if (!this._activeItem.hasChildren) return
                e.preventDefault()
                if (this._activeItem.isExpanded) {
                    this.focusAt(this.visibleItems(), index + 1)
                } else {
                    this._activeItem.expand()
                }
                return

            case 'ArrowLeft':
                e.preventDefault()
                if (this._activeItem.hasChildren && this._activeItem.isExpanded) {
                    this._activeItem.collapse()
                    return
                }
                this.focusParent()
                return

            case 'Enter':
            case ' ':
                if (!this._activeItem.hasChildren) return
                e.preventDefault()
                this._activeItem.toggle()
        }
    }

    private focusAt(list: TreeItem[], index: number) {
        if (index < 0 || index >= list.length) return
        this._activeItem = list[index]
        this._activeItem.focus()
        this.syncTabIndex()
    }

    private focusParent() {
        const group = this._activeItem?.parentGroup
        const parentEl = group?.parentElement as HTMLElement | null
        const parentItem = this._items.find((i) => i.el === parentEl)
        if (!parentItem) return

        this._activeItem = parentItem
        parentItem.focus()
        this.syncTabIndex()
    }

    private serializeOrder(): { id: string; children: object[] }[] {
        return this.serializeList(this._el)
    }

    private serializeList(list: Element): { id: string; children: object[] }[] {
        return Array.from(list.children)
            .filter((el) => el.hasAttribute('data-wire-tree-item'))
            .map((el) => {
                const group = Array.from(el.children).find((c) => c.hasAttribute('data-wire-tree-group'))
                return {
                    id: (el as HTMLElement).id,
                    children: group ? this.serializeList(group) : [],
                }
            })
    }
}
