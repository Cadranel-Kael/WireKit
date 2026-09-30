/**
 * Finds the first direct child of `el` matching `selector`.
 * Avoids relying on the `:scope` combinator, which some environments
 * (including happy-dom, used in tests) resolve inconsistently.
 */
function findChild(el: Element, selector: string): HTMLElement | null {
    return (Array.from(el.children).find((child) => child.matches(selector)) as HTMLElement | undefined) ?? null
}

/**
 * A single node within a tree. Manages its own expanded/collapsed state
 * and the visibility of its nested group of children, if it has any.
 * @class
 */
export class TreeItem {
    private readonly _el: HTMLElement
    private readonly _row: HTMLElement
    private readonly _toggle: HTMLElement | null
    private readonly _group: HTMLElement | null
    private readonly _variant: string | undefined
    private _isExpanded: boolean
    private _listeners: Array<(item: TreeItem) => void> = []

    /**
     * Create a tree item.
     * @param el
     */
    constructor(el: HTMLElement) {
        this._el = el
        this._row = findChild(el, '[data-wire-tree-row]') as HTMLElement
        this._toggle = this._row?.querySelector<HTMLElement>('[data-wire-tree-toggle]') ?? null
        this._group = findChild(el, '[data-wire-tree-group]')
        this._variant = el.closest<HTMLElement>('[data-wire-tree]')?.dataset.wireTreeVariant
        this._isExpanded = el.dataset.wireExpanded === 'true'
        this._row?.addEventListener('click', this.handleClick)
        this.sync()
    }

    get el() {
        return this._el
    }

    get row() {
        return this._row
    }

    get parentGroup(): HTMLElement | null {
        return this._el.parentElement?.closest<HTMLElement>('[data-wire-tree-group]') ?? null
    }

    get isDisabled(): boolean {
        return this._el.getAttribute('aria-disabled') === 'true'
    }

    get isExpanded() {
        return this._isExpanded
    }

    expand() {
        this.toggle(true)
    }

    collapse() {
        this.toggle(false)
    }

    get hasChildren(): boolean {
        return this._group != null
    }

    toggle(force?: boolean) {
        if (!this._group || this.isDisabled) return

        const next = force ?? !this._isExpanded
        if (next === this._isExpanded) return

        this._isExpanded = next
        this.sync()
        this._listeners.forEach((l) => l(this))
    }

    onChange(fn: (item: TreeItem) => void) {
        this._listeners.push(fn)
    }

    focus() {
        this._row?.focus()
    }

    destroy() {
        this._row?.removeEventListener('click', this.handleClick)
    }

    private handleClick = (e: MouseEvent) => {
        if (this.isDisabled || !this._group) return

        const target = e.target as HTMLElement
        if (this._toggle && (target === this._toggle || this._toggle.contains(target))) {
            e.preventDefault()
            this.toggle()
            return
        }

        if (this._row.tagName !== 'A') {
            this.toggle()
        }
    }

    private sync() {
        this._el.dataset.wireExpanded = String(this._isExpanded)
        if (this._toggle) {
            // The toggle is always rendered (so a group added later, e.g.
            // by dragging an item into a previously-childless one, has
            // something to show/wire up rather than needing new markup
            // fabricated in JS). "file" rows always reserved a fixed-size
            // box for it even without children (for alignment with rows
            // that do have one), so hide it without collapsing that space;
            // "list" rows never reserved space for a leaf, so hide it the
            // normal way.
            if (this._variant === 'file') {
                this._toggle.style.visibility = 'hidden'
            } else {
                this._toggle.style.display = 'none'
            }
        }
        if (this._group && this.hasChildren) {
            this._el.setAttribute('aria-expanded', String(this._isExpanded))
            // Mirrored onto the row too: it (not the <li>) carries the
            // `.group` class that `group-aria-expanded:*` utilities (the
            // open/closed icon swap, and this row's own toggle icon) key
            // off of -- Tailwind's `group-*` variants only match when both
            // the class and the state attribute are on the same element.
            this._row?.setAttribute('aria-expanded', String(this._isExpanded))
            this._group.style.display = this._isExpanded ? '' : 'none'
            if (this._toggle) {
                this._toggle.style.visibility = ''
                this._toggle.style.display = ''
                // Base icon is chevron-right (collapsed, pointing at its
                // child); rotate it to point down once expanded.
                this._toggle.style.transform = this._isExpanded ? 'rotate(90deg)' : ''
            }
        }
    }
}
