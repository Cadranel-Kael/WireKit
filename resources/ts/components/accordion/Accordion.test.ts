import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Accordion } from './Accordion';

function mockMatchMedia(prefersReduced = false) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue({
            matches: prefersReduced,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }),
    });
}

function makeEl(options: {
    expanded?: boolean;
    transition?: boolean;
    groupId?: string;
} = {}): HTMLElement {
    const el = document.createElement('div');
    el.dataset.wireAccordion = '';
    el.dataset.wireExpanded = String(options.expanded ?? false);
    el.dataset.wireTransition = String(options.transition ?? false);
    if (options.groupId !== undefined) {
        el.dataset.wireGroup = options.groupId;
    }

    const heading = document.createElement('button');
    heading.dataset.wireAccordionHeading = '';
    el.appendChild(heading);

    const content = document.createElement('div');
    content.dataset.wireAccordionContent = '';
    el.appendChild(content);

    document.body.appendChild(el);
    return el;
}

beforeEach(() => {
    document.body.innerHTML = '';
    mockMatchMedia(false);
});

describe('Accordion', () => {
    describe('initial state', () => {
        it('initialises as collapsed when data-wire-expanded is false', () => {
            const el = makeEl({ expanded: false });
            const accordion = new Accordion(el);

            expect(accordion.isExpanded).toBe(false);
        });

        it('initialises as expanded when data-wire-expanded is true', () => {
            const el = makeEl({ expanded: true });
            const accordion = new Accordion(el);

            expect(accordion.isExpanded).toBe(true);
        });

        it('sets heading aria-expanded to false on init when collapsed', () => {
            const el = makeEl({ expanded: false });
            new Accordion(el);

            const heading = el.querySelector('[data-wire-accordion-heading]') as HTMLElement;
            expect(heading.ariaExpanded).toBe('false');
        });

        it('sets heading aria-expanded to true on init when expanded', () => {
            const el = makeEl({ expanded: true });
            new Accordion(el);

            const heading = el.querySelector('[data-wire-accordion-heading]') as HTMLElement;
            expect(heading.ariaExpanded).toBe('true');
        });

        it('hides content on init when collapsed (no transition)', () => {
            const el = makeEl({ expanded: false });
            new Accordion(el);

            const content = el.querySelector('[data-wire-accordion-content]') as HTMLElement;
            expect(content.style.display).toBe('none');
        });

        it('shows content on init when expanded (no transition)', () => {
            const el = makeEl({ expanded: true });
            new Accordion(el);

            const content = el.querySelector('[data-wire-accordion-content]') as HTMLElement;
            expect(content.style.display).toBe('block');
        });

        it('exposes the root element via el getter', () => {
            const el = makeEl();
            const accordion = new Accordion(el);

            expect(accordion.el).toBe(el);
        });

        it('exposes the groupId from the dataset', () => {
            const el = makeEl({ groupId: 'my-group' });
            const accordion = new Accordion(el);

            expect(accordion.groupId).toBe('my-group');
        });

        it('groupId is undefined when no data-wire-group is set', () => {
            const el = makeEl();
            const accordion = new Accordion(el);

            expect(accordion.groupId).toBeUndefined();
        });
    });

    describe('toggle()', () => {
        it('expands when collapsed', () => {
            const el = makeEl({ expanded: false });
            const accordion = new Accordion(el);

            accordion.toggle();

            expect(accordion.isExpanded).toBe(true);
        });

        it('collapses when expanded', () => {
            const el = makeEl({ expanded: true });
            const accordion = new Accordion(el);

            accordion.toggle();

            expect(accordion.isExpanded).toBe(false);
        });

        it('forces expand with toggle(true)', () => {
            const el = makeEl({ expanded: false });
            const accordion = new Accordion(el);

            accordion.toggle(true);

            expect(accordion.isExpanded).toBe(true);
        });

        it('forces collapse with toggle(false)', () => {
            const el = makeEl({ expanded: true });
            const accordion = new Accordion(el);

            accordion.toggle(false);

            expect(accordion.isExpanded).toBe(false);
        });

        it('is a no-op when forcing the current state', () => {
            const el = makeEl({ expanded: false });
            const accordion = new Accordion(el);
            const listener = vi.fn();
            accordion.onChange(listener);

            accordion.toggle(false);

            expect(listener).not.toHaveBeenCalled();
        });

        it('updates aria-expanded after toggling', () => {
            const el = makeEl({ expanded: false });
            const accordion = new Accordion(el);
            const heading = el.querySelector('[data-wire-accordion-heading]') as HTMLElement;

            accordion.toggle();

            expect(heading.ariaExpanded).toBe('true');
        });
    });

    describe('collapse()', () => {
        it('collapses an expanded accordion', () => {
            const el = makeEl({ expanded: true });
            const accordion = new Accordion(el);

            accordion.collapse();

            expect(accordion.isExpanded).toBe(false);
        });

        it('is a no-op on an already collapsed accordion', () => {
            const el = makeEl({ expanded: false });
            const accordion = new Accordion(el);
            const listener = vi.fn();
            accordion.onChange(listener);

            accordion.collapse();

            expect(listener).not.toHaveBeenCalled();
        });
    });

    describe('onChange()', () => {
        it('fires the callback when the accordion expands', () => {
            const el = makeEl({ expanded: false });
            const accordion = new Accordion(el);
            const listener = vi.fn();
            accordion.onChange(listener);

            accordion.toggle();

            expect(listener).toHaveBeenCalledOnce();
            expect(listener).toHaveBeenCalledWith(accordion);
        });

        it('fires the callback when the accordion collapses', () => {
            const el = makeEl({ expanded: true });
            const accordion = new Accordion(el);
            const listener = vi.fn();
            accordion.onChange(listener);

            accordion.toggle();

            expect(listener).toHaveBeenCalledOnce();
        });

        it('supports multiple listeners', () => {
            const el = makeEl();
            const accordion = new Accordion(el);
            const a = vi.fn();
            const b = vi.fn();
            accordion.onChange(a);
            accordion.onChange(b);

            accordion.toggle();

            expect(a).toHaveBeenCalledOnce();
            expect(b).toHaveBeenCalledOnce();
        });
    });

    describe('heading click', () => {
        it('toggles the accordion on click', () => {
            const el = makeEl({ expanded: false });
            const accordion = new Accordion(el);
            const heading = el.querySelector('[data-wire-accordion-heading]') as HTMLElement;

            heading.click();

            expect(accordion.isExpanded).toBe(true);
        });

        it('collapses on a second click', () => {
            const el = makeEl({ expanded: false });
            const accordion = new Accordion(el);
            const heading = el.querySelector('[data-wire-accordion-heading]') as HTMLElement;

            heading.click();
            heading.click();

            expect(accordion.isExpanded).toBe(false);
        });
    });

    describe('transitions disabled (prefers-reduced-motion)', () => {
        it('ignores the transition flag when prefers-reduced-motion is set', () => {
            mockMatchMedia(true);
            const el = makeEl({ expanded: false, transition: true });
            const accordion = new Accordion(el);

            accordion.toggle();

            const content = el.querySelector('[data-wire-accordion-content]') as HTMLElement;
            expect(content.style.display).toBe('block');
            expect(content.style.transition).toBe('');
        });
    });

    describe('with transitions enabled', () => {
        it('sets height transition styles when expanding', () => {
            const el = makeEl({ expanded: false, transition: true });
            // scrollHeight returns 0 in jsdom — still validates style application
            new Accordion(el);

            const accordion = new Accordion(el);
            // Reset for clean state
            const content = el.querySelector('[data-wire-accordion-content]') as HTMLElement;

            accordion.toggle();

            expect(content.style.transition).toContain('height');
            expect(content.style.overflow).toBe('hidden');
        });
    });
});
