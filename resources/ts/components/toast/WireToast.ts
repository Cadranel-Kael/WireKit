export default class WireToast extends HTMLElement {
    static observedAttributes = ['message', 'duration', 'variant']
    private _timer?: ReturnType<typeof setTimeout>
    private _startTime = 0
    private _remaining = 0
    private _duration = 0

    connectedCallback() {
        this.render()
        this.openCard()
        this.scheduleDismiss()

        this.addEventListener('wire-toast:pause', () => this.pause())
        this.addEventListener('wire-toast:resume', () => this.resume())

        this.querySelector('[data-wire-toast-dismiss]')?.addEventListener('click', () => this.dismiss())
    }

    disconnectedCallback() {
        clearTimeout(this._timer)
    }

    attributeChangedCallback(name: string) {
        if (!this.isConnected) return
        if (name === 'message') this.render()
        if (name === 'duration') this.scheduleDismiss()
    }

    private card(): HTMLElement | null {
        return this.querySelector<HTMLElement>('[data-wire-alert]')
    }

    private openCard(): void {
        const card = this.card()
        card?.removeAttribute('closing')
        card?.setAttribute('open', '')
    }

    private render() {
        const messageEl = this.querySelector<HTMLElement>('[data-wire-toast-message]')
        if (messageEl) messageEl.textContent = this.getAttribute('message') ?? ''
        const headingEl = this.querySelector<HTMLElement>('[data-wire-toast-heading]')
        const heading = this.getAttribute('heading')
        if (headingEl) {
            if (heading) {
                headingEl.textContent = heading
            } else {
                headingEl.parentElement?.remove()
            }
        }
    }

    private scheduleDismiss() {
        clearTimeout(this._timer)

        const duration = Number(this.getAttribute('duration'))
        if (!duration || duration <= 0) return

        this._duration = duration
        this._remaining = duration
        this._startTime = Date.now()

        this.style.setProperty('--wire-toast-duration', `${duration}ms`)

        this._timer = setTimeout(() => this.dismiss(), this._remaining)
    }

    private pause() {
        clearTimeout(this._timer)

        const elapsed = Date.now() - this._startTime
        this._remaining = Math.max(this._remaining - elapsed, 0)
    }

    private resume() {
        this._startTime = Date.now()

        this._timer = setTimeout(() => {
            this.dismiss()
        }, this._remaining)
    }

    async dismiss(): Promise<void> {
        clearTimeout(this._timer)
        const card = this.card()

        if (card) {
            card.removeAttribute('open')
            card.setAttribute('closing', '')
            await Promise.allSettled(card.getAnimations().map((a) => a.finished))
        }

        this.remove()
    }
}
