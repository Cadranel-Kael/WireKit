export class Tooltip {
    private trigger: HTMLElement | null;
    private content: HTMLElement | null;
    private isVisible: boolean = false;
    private isFocused: boolean = false;
    private hasDelay: boolean = false;
    private delay?: number;
    private timeout?: number;
    private boundKeyDownHandler: (e: KeyboardEvent) => void;

    constructor(private el: HTMLElement) {
        this.content = el.querySelector('[data-wire-tooltip-content]');
        this.trigger = el.querySelector('[data-wire-tooltip-trigger]');
        this.hasDelay = el.hasAttribute('data-wire-delay');
        if (this.hasDelay) {
            this.delay = Number(el.dataset.wireDelay);
            if (!this.delay || this.delay === 1) {
                this.delay = 300;
            }
        }

        this.boundKeyDownHandler = this.onKeyDown.bind(this);
        this.attachEventListeners();
        this.sync();
    }

    private attachEventListeners() {
        if (!this.content || !this.trigger) return;
        this.trigger.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        this.content.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        this.trigger.addEventListener('focus', this.onFocus.bind(this));
        this.trigger.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        this.content.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        this.trigger.addEventListener('blur', this.onBlur.bind(this));
        document.addEventListener('keydown', this.boundKeyDownHandler);
    }

    private toggle(force?: boolean) {
        this.isVisible = force ?? !this.isVisible;
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
        if (this.isVisible && e.key === 'Escape') {
            this.hide();
        }
    }

    private onMouseEnter() {
        if (this.delay) {
            this.timeout = window.setTimeout(() => {
                this.show();
            }, this.delay);
            return;
        }
        this.show();
    }

    private onMouseLeave() {
        this.clearTimeout();
        if (this.isFocused) return;
        this.toggle(false);
    }

    private clearTimeout() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = undefined;
        }
    }

    private sync() {
        if (!this.content) return;
        this.isFocused = document.activeElement === this.trigger;
        if (!this.isVisible) {
            this.content.style.display = 'none';
        } else {
            this.content.style.display = 'block';
        }
    }

    public destroy() {
        document.removeEventListener('keydown', this.boundKeyDownHandler);
    }
}
