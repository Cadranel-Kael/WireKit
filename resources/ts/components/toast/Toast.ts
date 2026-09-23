import WireToast from './WireToast'

export default class Toast {
    private readonly _template: HTMLTemplateElement | null
    private _paused = false
    private _max: number = 3

    constructor(private _el: HTMLElement) {
        this._template = this._el.querySelector<HTMLTemplateElement>('[data-wire-toast-template]')
        this._max = parseInt(this._el.dataset.wireMax ?? '0')

        this._el.addEventListener('mouseenter', () => this.pauseAll())
        this._el.addEventListener('mouseleave', () => this.resumeAll())

        Livewire.on(
            'toast:show',
            ({
                message,
                heading,
                duration,
                variant,
            }: {
                message: string
                heading?: string | null
                duration?: number | null
                variant?: string | null
            }) => {
                this.show(message, heading ?? undefined, duration ?? undefined, variant ?? undefined)
            },
        )

        new MutationObserver(() => this.updateStack()).observe(this._el, {
            childList: true,
        })
    }

    show(message: string, heading: string | null = null, duration: number = 5000, variant: string | null = null): void {
        if (!this._template) return

        const fragment = this._template.content.cloneNode(true) as DocumentFragment
        const toast = fragment.firstElementChild as HTMLElement

        toast.setAttribute('message', message)
        toast.setAttribute('duration', String(duration))
        if (heading) toast.setAttribute('heading', heading)
        if (variant) toast.setAttribute('variant', variant)

        this._el.appendChild(toast)

        if (!this._el.matches(':popover-open')) {
            this._el.showPopover()
        }
    }

    private updateStack() {
        const toasts = [...this._el.querySelectorAll<WireToast>('wire-toast')].reverse()

        let offset = 0

        for (let index = 0; index < toasts.length; index++) {
            const toast = toasts[index]

            toast.style.setProperty('--toast-index', String(index))

            if (index < this._max) {
                toast.style.setProperty('--toast-offset', `${offset}px`)
                offset += toast.offsetHeight + 8
            }

            if (index >= this._max) {
                toast.dismiss()
            }
        }
    }

    private pauseAll() {
        this._paused = true

        this._el.querySelectorAll<HTMLElement>('wire-toast').forEach((toast) => {
            toast.dispatchEvent(new CustomEvent('wire-toast:pause'))
        })
    }

    private resumeAll() {
        this._paused = false
        console.log('resumeAll')

        this._el.querySelectorAll<HTMLElement>('wire-toast').forEach((toast) => {
            toast.dispatchEvent(new CustomEvent('wire-toast:resume'))
        })
    }
}
