/**
 * An accordion item that can belong to a group.
 * @class
 */
export class Accordion {
    private _isExpanded: boolean;
    private _heading: HTMLElement;
    private _content: HTMLElement;
    private _listeners: Array<(a: Accordion) => void> = [];
    private readonly _groupId: string | undefined;
    private readonly _transition: boolean;
    private _height: number = 0;
    private _onTransitionEnd?: (e: TransitionEvent) => void;
    private readonly _el: HTMLElement;

    /**
     * Create an accordion item.
     * @param el
     */
    constructor(el: HTMLElement) {
        this._el = el;
        this._isExpanded = el.dataset.wireExpanded === 'true';
        this._heading = el.querySelector('[data-wire-accordion-heading]') as HTMLElement;
        this._content = el.querySelector('[data-wire-accordion-content]') as HTMLElement;
        this._heading.addEventListener('click', () => this.toggle());
        this._groupId = el.dataset.wireGroup;
        const isReduced = window.matchMedia('(prefers-reduced-motion)').matches;
        this._transition = el.dataset.wireTransition === 'true' && !isReduced;
        this.sync();
    }

    get el() {
        return this._el;
    }

    get groupId() {
        return this._groupId;
    }

    collapse() {
        this.toggle(false);
    }

    get isExpanded() {
        return this._isExpanded;
    }

    toggle(force?: boolean) {
        const next = force ?? !this._isExpanded;
        if (next === this._isExpanded) return;

        this._isExpanded = force ?? !this._isExpanded;
        this.sync();
        this._listeners.forEach((l) => l(this));
    }

    onChange(fn: (a: Accordion) => void) {
        this._listeners.push(fn);
    }

    private measure() {
        this._content.style.display = 'block';
        this._content.style.height = 'auto';
        return this._content.scrollHeight;
    }

    private sync() {
        if (this._onTransitionEnd) {
            this._content.removeEventListener('transitionend', this._onTransitionEnd);
            this._onTransitionEnd = undefined;
        }
        this._heading.ariaExpanded = String(this._isExpanded);

        if (!this._transition) {
            this._content.style.display = this._isExpanded ? 'block' : 'none';
            return;
        }
        this._height = this.measure();
        if (this._isExpanded) {
            this._content.style.display = 'block';
            this._content.style.overflow = 'hidden';
            this._content.style.height = '0px';
            this._content.style.transition = 'height 300ms';

            this._content.offsetHeight;
            this._content.style.height = `${this._height}px`;
            this._onTransitionEnd = (e: TransitionEvent) => {
                if (e.propertyName !== 'height' || !this._isExpanded) return;
                this._content.style.height = 'auto';
                this._content.style.overflow = '';
                this._content.style.transition = '';
                this._content.removeEventListener('transitionend', this._onTransitionEnd!);
                this._onTransitionEnd = undefined;
            };
            this._content.addEventListener('transitionend', this._onTransitionEnd);
        } else {
            this._content.style.height = `${this._height}px`;
            this._content.style.overflow = 'hidden';
            this._content.style.transition = 'height 300ms';

            this._content.offsetHeight;
            this._content.style.height = '0px';
            this._onTransitionEnd = (e: TransitionEvent) => {
                if (e.propertyName !== 'height' || this._isExpanded) return;
                this._content.style.display = 'none';
                this._content.style.overflow = '';
                this._content.style.transition = '';
                this._content.removeEventListener('transitionend', this._onTransitionEnd!);
                this._onTransitionEnd = undefined;
            };
            this._content.addEventListener('transitionend', this._onTransitionEnd);
        }
    }
}
