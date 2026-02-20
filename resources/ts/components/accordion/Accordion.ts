export class Accordion {
    private expanded: boolean;
    private heading: HTMLElement;
    private content: HTMLElement;
    private listeners: Array<(a: Accordion) => void> = [];
    private groupId: string | undefined;
    private transition: boolean;
    private height: number = 0;
    private onTransitionEnd?: (e: TransitionEvent) => void;

    constructor(private el: HTMLElement) {
        this.expanded = el.dataset.wireExpanded === 'true';
        this.heading = el.querySelector('[data-wire-accordion-heading]') as HTMLElement;
        this.content = el.querySelector('[data-wire-accordion-content]') as HTMLElement;
        this.heading.addEventListener('click', () => this.toggle());
        this.groupId = el.dataset.wireGroup;
        const isReduced = window.matchMedia('(prefers-reduced-motion)').matches;
        this.transition = el.dataset.wireTransition === 'true' && !isReduced;
        this.sync();
    }

    get getGroupId() {
        return this.groupId;
    }

    collapse() {
        this.toggle(false);
    }

    get isExpanded() {
        return this.expanded;
    }

    toggle(force?: boolean) {
        const next = force ?? !this.expanded;
        if (next === this.expanded) return;

        this.expanded = force ?? !this.expanded;
        this.sync();
        this.listeners.forEach((l) => l(this));
    }

    onChange(fn: (a: Accordion) => void) {
        this.listeners.push(fn);
    }

    private measure() {
        this.content.style.display = 'block';
        this.content.style.height = 'auto';
        return this.content.scrollHeight;
    }

    private sync() {
        if (this.onTransitionEnd) {
            this.content.removeEventListener('transitionend', this.onTransitionEnd);
            this.onTransitionEnd = undefined;
        }
        this.heading.ariaExpanded = String(this.expanded);

        if (!this.transition) {
            this.content.style.display = this.expanded ? 'block' : 'none';
            return;
        }
        this.height = this.measure();
        if (this.expanded) {
            this.content.style.display = 'block';
            this.content.style.overflow = 'hidden';
            this.content.style.height = '0px';
            this.content.style.transition = 'height 300ms';

            this.content.offsetHeight;
            this.content.style.height = `${this.height}px`;
            this.onTransitionEnd = (e: TransitionEvent) => {
                if (e.propertyName !== 'height' || !this.expanded) return;
                this.content.style.height = 'auto';
                this.content.style.overflow = '';
                this.content.style.transition = '';
                this.content.removeEventListener('transitionend', this.onTransitionEnd!);
                this.onTransitionEnd = undefined;
            };
            this.content.addEventListener('transitionend', this.onTransitionEnd);
        } else {
            this.content.style.height = `${this.height}px`;
            this.content.style.overflow = 'hidden';
            this.content.style.transition = 'height 300ms';

            this.content.offsetHeight;
            this.content.style.height = '0px';
            this.onTransitionEnd = (e: TransitionEvent) => {
                if (e.propertyName !== 'height' || this.expanded) return;
                this.content.style.display = 'none';
                this.content.style.overflow = '';
                this.content.style.transition = '';
                this.content.removeEventListener('transitionend', this.onTransitionEnd!);
                this.onTransitionEnd = undefined;
            };
            this.content.addEventListener('transitionend', this.onTransitionEnd);
        }
    }
}
