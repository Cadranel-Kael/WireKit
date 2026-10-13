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
 */
export class TreeItem {
    private readonly _el: HTMLElement
    private readonly _row: HTMLElement
    private readonly _toggle: HTMLElement | null
    private readonly _group: HTMLElement | null
    private readonly _variant: string | undefined
    private _isExpanded: boolean
    private _listeners: Array<(item: TreeItem) => void> = []

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

    /**
     * Mirrors a mouse click on the row -- clicking the nested link if the
     * item renders one (so Enter navigates the same way a pointer click
     * does), falling back to the row itself (so a folder with no link but
     * a wire:click of its own, or a childless row with neither, still gets
     * the same click dispatch a mouse would produce).
     */
    activate() {
        if (this.isDisabled) return
        const link = this._row?.querySelector<HTMLAnchorElement>('a')
        ;(link ?? this._row)?.click()
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
            if (this._variant === 'file') {
                this._toggle.style.visibility = 'hidden'
            } else {
                this._toggle.style.display = 'none'
            }
        }
        if (this._group && this.hasChildren) {
            this._el.setAttribute('aria-expanded', String(this._isExpanded))
            this._row?.setAttribute('aria-expanded', String(this._isExpanded))
            this._group.style.display = this._isExpanded ? '' : 'none'
            if (this._toggle) {
                this._toggle.style.visibility = ''
                this._toggle.style.display = ''
                this._toggle.style.transform = this._isExpanded ? 'rotate(90deg)' : ''
            }
        }
    }
}
