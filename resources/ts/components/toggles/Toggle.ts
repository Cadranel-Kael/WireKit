export class Toggle {
    private active: boolean;
    private exclusive: boolean;
    private listeners: Array<(t: Toggle) => void> = [];

    constructor(private el: HTMLButtonElement) {
        this.active = el.dataset.wireActive === 'true';
        this.exclusive = el.dataset.wireExclusive === 'true';
        this.sync();
        el.addEventListener('click', () => this.toggle());
    }

    get isExlcusive() {
        return this.exclusive;
    }

    get isActive() {
        return this.active;
    }

    deactivate() {
        this.toggle(false);
    }

    toggle(force?: boolean) {
        const next = force ?? !this.active;
        if (next === this.active) return;

        this.active = force ?? !this.active;
        this.sync();
        this.listeners.forEach((l) => l(this));
    }

    private sync() {
        this.el.dataset.state = this.active ? 'on' : 'off';
        this.el.ariaPressed = String(this.active);
    }

    onChange(fn: (t: Toggle) => void) {
        this.listeners.push(fn);
    }
}
