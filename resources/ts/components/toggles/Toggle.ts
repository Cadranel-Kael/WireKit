export class Toggle {
    private _active: boolean;
    private _exclusive: boolean;
    private _listeners: Array<(t: Toggle) => void> = [];
    private _el: HTMLButtonElement;

    constructor(el: HTMLButtonElement) {
        this._el = el;
        this._active = el.dataset.wireActive === 'true';
        this._exclusive = el.dataset.wireExclusive === 'true';
        this.sync();
        this._el.addEventListener('click', () => this.toggle());
    }

    get exclusive() {
        return this._exclusive;
    }

    get el() {
        return this._el;
    }

    get active() {
        return this._active;
    }

    deactivate() {
        this.toggle(false);
    }

    toggle(force?: boolean) {
        const next = force ?? !this._active;
        if (next === this._active) return;

        this._active = force ?? !this._active;
        this.sync();
        this._listeners.forEach((l) => l(this));
    }

    private sync() {
        this._el.dataset.state = this._active ? 'on' : 'off';
        this._el.ariaPressed = String(this._active);
    }

    onChange(fn: (t: Toggle) => void) {
        this._listeners.push(fn);
    }
}
