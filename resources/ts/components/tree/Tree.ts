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
    private _hasHandle: boolean = false
    private _lastPointerX: number = 0
    private _lastPointerY: number = 0
    private _touchedGroups: Set<HTMLElement> = new Set()

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
        this._hasHandle = this._el.querySelector('[data-wire-tree-handle]') !== null
        this._sortableInstances = lists.map((list) => this.makeSortable(list, this._hasHandle))
    }

    private makeSortable(list: HTMLElement, hasHandle: boolean): Sortable {
        const options: Sortable.Options = {
            animation: 150,
            forceFallback: true,
            fallbackOnBody: true,
            ...(hasHandle
                ? { handle: '[data-wire-tree-handle]' }
                : { filter: 'button, [data-wire-tree-no-drag]', preventOnFilter: false }),
            ...(this._nested && { group: { name: 'wire-tree', pull: true, put: true } }),
            onStart: (evt) => {
                this._draggedEl = evt.item
                this._touchedGroups = new Set()
                this._items.find((i) => i.el === this._draggedEl)?.collapse()
                const row = evt.item.querySelector<HTMLElement>('[data-wire-tree-row]')
                if (row) row.dataset.state = 'dragging'
                const suppressClick = (e: MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                }
                document.addEventListener('click', suppressClick, true)
                setTimeout(() => document.removeEventListener('click', suppressClick, true), 0)
                if (this._nested && this._hasHandle) {
                    document.addEventListener('pointermove', this.handleDragPointerMove)
                }
                if (this._nested && !this._hasHandle) {
                    document.addEventListener('pointermove', this.trackPointer)
                }
            },
            onEnd: this.handleSortEnd,
        }
        return Sortable.create(list, options)
    }

    private trackPointer = (e: PointerEvent) => {
        this._lastPointerX = e.clientX
        this._lastPointerY = e.clientY
    }

    private handleSortEnd = (evt: Sortable.SortableEvent) => {
        document.removeEventListener('pointermove', this.handleDragPointerMove)
        document.removeEventListener('pointermove', this.trackPointer)
        this._draggedEl = undefined

        const row = evt.item.querySelector<HTMLElement>('[data-wire-tree-row]')
        if (row) row.dataset.state = ''

        document.querySelectorAll('.sortable-fallback').forEach((el) => el.remove())

        const { from, to } = evt

        if (from === to && !this._hasHandle) {
            this.maybeNestOnDrop(evt.item)
        }

        if (from !== to) {
            const destParentLi = to.parentElement
            if (destParentLi?.hasAttribute('data-wire-tree-item')) {
                destParentLi.dataset.wireExpanded = 'true'
                destParentLi.setAttribute('aria-expanded', 'true')
                to.style.display = ''
            }
        }

        this.cleanupIfEmptyGroup(from)
        this._touchedGroups.forEach((group) => this.cleanupIfEmptyGroup(group))
        this._touchedGroups = new Set()

        this._el.dispatchEvent(
            new CustomEvent('wire:tree:reorder', { bubbles: true, detail: { order: this.serializeOrder() } }),
        )
        Livewire.dispatch('wire:tree:reorder', { order: this.serializeOrder() })

        this.refreshItems()
    }

    /**
     * Finds the tree item under the pointer at drop time and, if it's a
     * valid target (not the dragged item or one of its own descendants,
     * not itself excluded from dragging via draggable="false"), nests the
     * dragged item into it -- creating its group if it's currently
     * childless. Runs after Sortable's own drop handling has fully
     * settled, so mutating the DOM here is safe.
     */
    private maybeNestOnDrop(draggedEl: HTMLElement): void {
        const targetEl = document.elementFromPoint(this._lastPointerX, this._lastPointerY)
        const targetLi = targetEl?.closest<HTMLElement>('[data-wire-tree-item]')
        if (!targetLi || targetLi === draggedEl) return
        if (targetLi.contains(draggedEl) || draggedEl.contains(targetLi)) return
        const targetRow = targetLi.querySelector<HTMLElement>('[data-wire-tree-row]')
        if (targetRow?.hasAttribute('data-wire-tree-no-drag')) return

        let group = Array.from(targetLi.children).find((c) => c.hasAttribute('data-wire-tree-group')) as
            | HTMLElement
            | undefined

        if (!group) {
            group = this.createGroup()
            targetLi.appendChild(group)
            this._sortableInstances.push(this.makeSortable(group, this._hasHandle))
        }

        group.appendChild(draggedEl)
        targetLi.dataset.wireExpanded = 'true'
        targetLi.setAttribute('aria-expanded', 'true')
    }

    /**
     * Destroys and removes a [data-wire-tree-group] list once it's empty
     * (never the root list), so a folder that no longer has children stops
     * showing an expand toggle for nothing. Shared by the normal cross-list
     * drop path and maybeNestOnDrop, either of which can be what emptied it.
     */
    private cleanupIfEmptyGroup(list: HTMLElement): void {
        if (list === this._el || list.children.length > 0) return

        const idx = this._sortableInstances.findIndex((s) => s.el === list)
        if (idx !== -1) {
            this._sortableInstances[idx].destroy()
            this._sortableInstances.splice(idx, 1)
        }
        const parentLi = list.parentElement as HTMLElement | null
        list.remove()
        if (parentLi) {
            parentLi.removeAttribute('aria-expanded')
            delete parentLi.dataset.wireExpanded
        }
    }

    /**
     * Indents/outdents the dragged item based on where SortableJS's fallback
     * ghost (`.sortable-fallback`, an absolutely-positioned clone that
     * tracks the pointer -- present because every tree drag runs with
     * forceFallback: true) actually sits, not on accumulated pointer
     * movement. Re-evaluated from the live DOM on every move, so it's
     * idempotent: the same ghost position always yields the same indent
     * state, however much the pointer wiggled to get there.
     *
     * Indenting requires the ghost to clear the *next* indent level's row
     * by INDENT_THRESHOLD; outdenting only requires it to fall back within
     * OUTDENT_THRESHOLD of the current level's row. Using a smaller
     * threshold to leave than to enter creates a dead zone between the two,
     * so hovering near the boundary doesn't flicker in and out.
     */
    private handleDragPointerMove = (e: PointerEvent) => {
        if (!this._draggedEl) return

        const ghost = document.querySelector<HTMLElement>('.sortable-fallback')
        const ghostLeft = ghost ? ghost.getBoundingClientRect().left : e.clientX

        const INDENT_THRESHOLD = 32
        const OUTDENT_THRESHOLD = 12

        const prevSibling = this._draggedEl.previousElementSibling as HTMLElement | null
        const prevRow = prevSibling?.hasAttribute('data-wire-tree-item')
            ? prevSibling.querySelector<HTMLElement>('[data-wire-tree-row]')
            : null

        if (prevRow && ghostLeft - prevRow.getBoundingClientRect().left > INDENT_THRESHOLD) {
            this.indentDraggedItem(this._draggedEl)
            return
        }

        const currentGroup = this._draggedEl.parentElement
        const parentLi = currentGroup?.hasAttribute('data-wire-tree-group')
            ? (currentGroup.parentElement as HTMLElement | null)
            : null
        const parentRow = parentLi?.querySelector<HTMLElement>('[data-wire-tree-row]')

        if (parentRow && ghostLeft - parentRow.getBoundingClientRect().left < OUTDENT_THRESHOLD) {
            this.outdentDraggedItem(this._draggedEl)
        }
    }

    /**
     * Moves the dragged item into its previous sibling's group, creating
     * that group (and a Sortable instance for it) if it doesn't exist yet.
     * Never destroys a Sortable instance while a drag is in progress --
     * SortableJS's own fallback drag loop can hold references into a list
     * it's currently tracking, and destroying that list's instance out from
     * under it corrupts its internal state (the `sortable[expando] is
     * null` crash). Any group left empty by this gesture is only cleaned
     * up once the drag fully settles, in handleSortEnd.
     */
    private indentDraggedItem(draggedEl: HTMLElement): boolean {
        const prevSibling = draggedEl.previousElementSibling
        if (!prevSibling?.hasAttribute('data-wire-tree-item')) return false

        let group = Array.from(prevSibling.children).find((c) => c.hasAttribute('data-wire-tree-group')) as
            | HTMLElement
            | undefined

        if (!group) {
            group = this.createGroup()
            prevSibling.appendChild(group)
            this._sortableInstances.push(this.makeSortable(group, this._hasHandle))
            ;(prevSibling as HTMLElement).dataset.wireExpanded = 'true'
            ;(prevSibling as HTMLElement).setAttribute('aria-expanded', 'true')
            group.style.display = ''
        }

        this._touchedGroups.add(group)
        group.appendChild(draggedEl)
        return true
    }

    /**
     * Moves the dragged item back out to its parent group's own list. See
     * indentDraggedItem for why an emptied group is left in the DOM (marked
     * as touched) rather than destroyed here mid-drag.
     */
    private outdentDraggedItem(draggedEl: HTMLElement): boolean {
        const currentGroup = draggedEl.parentElement
        if (!currentGroup?.hasAttribute('data-wire-tree-group')) return false

        const parentLi = currentGroup.parentElement
        if (!parentLi?.hasAttribute('data-wire-tree-item')) return false

        const grandparent = parentLi.parentElement
        if (!grandparent) return false

        grandparent.insertBefore(draggedEl, parentLi.nextSibling)
        this._touchedGroups.add(currentGroup)

        if (currentGroup.children.length === 0) {
            parentLi.removeAttribute('aria-expanded')
            delete (parentLi as HTMLElement).dataset.wireExpanded
        }

        return true
    }

    /**
     * Mirrors the classes item.blade.php renders on a group `<ul>`, keyed
     * off the tree's variant, rather than copying an existing group's
     * className -- there may not be one yet (e.g. indenting into a folder
     * that's never had children before), and copying blind previously left
     * a JS-created group missing rounded-tl-none entirely.
     */
    private createGroup(): HTMLElement {
        const group = document.createElement('ul')
        group.setAttribute('role', 'group')
        group.dataset.wireTreeGroup = ''
        const variant = this._el.dataset.wireTreeVariant
        const classes = ['flex', 'flex-col']
        if (variant === 'file') {
            classes.push('border-border', 'ml-2', 'border-l', 'pl-2')
        } else {
            classes.push('ml-4')
        }
        if (variant === 'list') {
            classes.push('[&>*:first-child>*]:rounded-tl-none')
        }
        group.className = classes.join(' ')
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
