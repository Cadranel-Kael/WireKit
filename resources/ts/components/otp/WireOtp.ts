export default class WireOtp extends HTMLElement {
    private _input!: HTMLInputElement
    private _boxes!: NodeListOf<HTMLInputElement>

    connectedCallback() {
        this._input = this.querySelector('[data-wire-otp-input]') as HTMLInputElement
        this._boxes = this.querySelectorAll('[data-wire-otp-box]') as NodeListOf<HTMLInputElement>

        this._boxes[0].readOnly = false
        this._boxes[0].tabIndex = 1

        this._boxes.forEach((box, index) => {
            box.addEventListener('click', (e) => {
                e.preventDefault()
                if (box.value === '') {
                    Array.from(this._boxes)
                        .find((box) => box.value === '')
                        ?.focus()
                } else {
                    box.select()
                }
            })

            box.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault()
                    const prev = this._boxes[index - 1]
                    if (prev) {
                        prev.readOnly = false
                        prev.select()
                    }
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault()
                    const next = this._boxes[index + 1]
                    if (box.value !== '' && next) {
                        next.readOnly = false
                        next.tabIndex = 1
                        next.select()
                    }
                }
                if (e.key === 'Backspace') {
                    e.preventDefault()
                    if (box.value !== '') {
                        for (let i = index; i < this._boxes.length - 1; i++) {
                            this._boxes[i].value = this._boxes[i + 1].value
                        }
                        this._boxes[this._boxes.length - 1].value = ''
                        box.readOnly = false
                        box.select()
                    } else {
                        const prev = this._boxes[index - 1]
                        if (prev) {
                            prev.readOnly = false
                            prev.value = ''
                            prev.select()
                        }
                    }
                    this.syncInput()
                }
            })

            box.addEventListener('input', (e) => {
                const next = this._boxes[index + 1]
                if (box.value !== '' && next) {
                    next.readOnly = false
                    next.tabIndex = 1
                    next.select()
                }
                this.syncInput()
            })

            box.addEventListener('paste', (e) => {
                e.preventDefault()
                const pasted = e.clipboardData?.getData('text') ?? ''
                const chars = pasted.replace(/[^a-zA-Z0-9]/g, '').split('')

                if (chars.length === 0) return

                let lastFilledIndex = index
                for (let i = 0; i < chars.length; i++) {
                    const targetIndex = index + i
                    const target = this._boxes[targetIndex]
                    if (!target) break

                    target.readOnly = false
                    target.value = chars[i]
                    lastFilledIndex = targetIndex
                }

                const focusTarget = this._boxes[lastFilledIndex + 1] ?? this._boxes[lastFilledIndex]
                if (focusTarget) {
                    focusTarget.readOnly = false
                    focusTarget.tabIndex = 1
                    focusTarget.select()
                }

                this.syncInput()
            })
        })
    }

    private syncInput() {
        this._input.value = Array.from(this._boxes)
            .map((box) => box.value)
            .join('')

        this._input.dispatchEvent(new Event('input', { bubbles: true }))
    }
}
