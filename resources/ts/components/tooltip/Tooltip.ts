export class Tooltip {
    private _trigger: HTMLElement | null;
    private _content: HTMLElement | null;
    private _isVisible: boolean = false;
    private _isFocused: boolean = false;
    private _hasDelay: boolean = false;
    private _delay?: number;
    private _timeout?: number;
    private _boundKeyDownHandler: (e: KeyboardEvent) => void;

    constructor(private _el: HTMLElement) {
        this._content = _el.querySelector('[data-wire-tooltip-content]');
        this._trigger = _el.querySelector('[data-wire-tooltip-trigger]');
        this._hasDelay = _el.hasAttribute('data-wire-delay');
        if (this._hasDelay) {
            this._delay = Number(_el.dataset.wireDelay);
            if (!this._delay || this._delay === 1) {
                this._delay = 300;
            }
        }

        this._boundKeyDownHandler = this.onKeyDown.bind(this);
        this.attachEventListeners();
        this.sync();
    }

    private attachEventListeners() {
        if (!this._content || !this._trigger) return;
        this._trigger.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        this._content.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        this._trigger.addEventListener('focus', this.onFocus.bind(this));
        this._trigger.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        this._content.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        this._trigger.addEventListener('blur', this.onBlur.bind(this));
        document.addEventListener('keydown', this._boundKeyDownHandler);
    }

    private toggle(force?: boolean) {
        this._isVisible = force ?? !this._isVisible;
        this.sync();
    }

    private show() {
        this.toggle(true);
    }

    private hide() {
        this.toggle(false);
    }

    private onBlur() {
        this.hide();
    }

    private onFocus() {
        this.show();
    }

    private onKeyDown(e: KeyboardEvent) {
        if (this._isVisible && e.key === 'Escape') {
            this.hide();
        }
    }

    private onMouseEnter() {
        if (this._delay) {
            this._timeout = window.setTimeout(() => {
                this.show();
            }, this._delay);
            return;
        }
        this.show();
    }

    private onMouseLeave() {
        this.clearTimeout();
        if (this._isFocused) return;
        this.toggle(false);
    }

    private clearTimeout() {
        if (this._timeout) {
            window.clearTimeout(this._timeout);
            this._timeout = undefined;
        }
    }

    private sync() {
        if (!this._content) return;
        this._isFocused = document.activeElement === this._trigger;
        if (!this._isVisible) {
            this._content.style.display = 'none';
        } else {
            this._content.style.display = 'block';
        }
    }

    public destroy() {
        document.removeEventListener('keydown', this._boundKeyDownHandler);
    }
}
