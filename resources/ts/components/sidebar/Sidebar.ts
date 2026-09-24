const EXPANDED_CLASSES = ['w-2xs', 'p-4']
const COLLAPSED_CLASSES = ['w-0', 'p-0', 'overflow-hidden']
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function cookieName(id: string) {
    return `wire-sidebar-${id}`
}

function readCookie(name: string): string | undefined {
    return document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1]
}

export class Sidebar {
    private _isExpanded: boolean

    constructor(private _el: HTMLElement) {
        // The cookie (set by a previous toggle) wins over whatever the
        // server rendered -- it's the whole point of remembering state
        // across reloads. No cookie yet (first visit) falls back to
        // data-wire-expanded, i.e. whatever the Blade component defaulted to.
        const stored = this._el.id ? readCookie(cookieName(this._el.id)) : undefined
        this._isExpanded = stored ? stored === 'open' : this._el.dataset.wireExpanded === 'true'

        this.sync()
        document.addEventListener('click', this._handleDocumentClick)
    }

    get el() {
        return this._el
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

    toggle(force?: boolean) {
        const next = force ?? !this._isExpanded
        if (next === this._isExpanded) return

        this._isExpanded = next
        this.sync()
        this.persist()
    }

    private sync() {
        this._el.dataset.wireExpanded = String(this._isExpanded)
        this._el.classList.remove(...(this._isExpanded ? COLLAPSED_CLASSES : EXPANDED_CLASSES))
        this._el.classList.add(...(this._isExpanded ? EXPANDED_CLASSES : COLLAPSED_CLASSES))
    }

    private persist() {
        if (!this._el.id) return
        const value = this._isExpanded ? 'open' : 'closed'
        document.cookie = `${cookieName(this._el.id)}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
    }

    // Delegated on document rather than bound to specific triggers: a
    // trigger commonly lives outside this element (e.g. a hamburger button
    // in the header) and isn't necessarily wire:ignore'd, so it can be
    // swapped out by a Livewire morph at any point. Delegating means it
    // doesn't matter which node currently wears the attribute.
    private _handleDocumentClick = (e: MouseEvent) => {
        if (!this._el.id || !(e.target instanceof Element)) return

        const trigger = e.target.closest(`[data-wire-sidebar-trigger="${this._el.id}"]`)
        if (!trigger) return

        e.preventDefault()

        const action = (trigger as HTMLElement).dataset.wireSidebarAction
        if (action === 'open') this.expand()
        else if (action === 'close') this.collapse()
        else this.toggle()
    }

    destroy() {
        document.removeEventListener('click', this._handleDocumentClick)
    }
}
