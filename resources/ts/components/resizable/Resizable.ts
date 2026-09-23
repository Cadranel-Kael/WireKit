const MIN_PANEL_SIZE = 80

export class Resizable {
    private readonly _el: HTMLElement
    private readonly _horizontal: boolean

    constructor(el: HTMLElement) {
        this._el = el
        this._horizontal = el.dataset.orientation !== 'vertical'
        // Delegated on the (stable) root rather than bound to individual
        // separators, since Livewire can insert/remove separators and their
        // sibling panels later (e.g. a preview pane toggled on) without this
        // root element ever being reinitialized.
        this._el.addEventListener('pointerdown', this.handlePointerDown)
    }

    private handlePointerDown = (e: PointerEvent) => {
        const separator = (e.target as HTMLElement).closest<HTMLElement>('[data-wire-resizable-separator]')
        if (!separator || separator.parentElement !== this._el) return

        const prev = separator.previousElementSibling as HTMLElement | null
        const next = separator.nextElementSibling as HTMLElement | null
        if (!prev || !next) return

        e.preventDefault()

        const horizontal = this._horizontal
        const startPos = horizontal ? e.clientX : e.clientY
        const prevStart = horizontal ? prev.getBoundingClientRect().width : prev.getBoundingClientRect().height
        const nextStart = horizontal ? next.getBoundingClientRect().width : next.getBoundingClientRect().height

        const previousCursor = document.body.style.cursor
        const previousUserSelect = document.body.style.userSelect
        document.body.style.cursor = horizontal ? 'ew-resize' : 'ns-resize'
        document.body.style.userSelect = 'none'
        separator.setPointerCapture(e.pointerId)

        const handleMove = (moveEvent: PointerEvent) => {
            const pos = horizontal ? moveEvent.clientX : moveEvent.clientY
            const delta = pos - startPos

            let prevSize = prevStart + delta
            let nextSize = nextStart - delta

            if (prevSize < MIN_PANEL_SIZE) {
                nextSize -= MIN_PANEL_SIZE - prevSize
                prevSize = MIN_PANEL_SIZE
            }
            if (nextSize < MIN_PANEL_SIZE) {
                prevSize -= MIN_PANEL_SIZE - nextSize
                nextSize = MIN_PANEL_SIZE
            }
            if (prevSize < 0 || nextSize < 0) return

            prev.style.flex = `0 0 ${prevSize}px`
            next.style.flex = `0 0 ${nextSize}px`
        }

        const handleUp = () => {
            separator.releasePointerCapture(e.pointerId)
            document.body.style.cursor = previousCursor
            document.body.style.userSelect = previousUserSelect
            document.removeEventListener('pointermove', handleMove)
            document.removeEventListener('pointerup', handleUp)
        }

        document.addEventListener('pointermove', handleMove)
        document.addEventListener('pointerup', handleUp)
    }
}
