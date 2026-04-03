import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Accordion } from './Accordion';
import { AccordionGroup } from './AccordionGroup';

function mockMatchMedia() {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }),
    });
}

function makeAccordion(expanded = false): Accordion {
    const el = document.createElement('div');
    el.dataset.wireAccordion = '';
    el.dataset.wireExpanded = String(expanded);
    el.dataset.wireTransition = 'false';

    const heading = document.createElement('button');
    heading.dataset.wireAccordionHeading = '';
    el.appendChild(heading);

    const content = document.createElement('div');
    content.dataset.wireAccordionContent = '';
    el.appendChild(content);

    document.body.appendChild(el);
    return new Accordion(el);
}

beforeEach(() => {
    document.body.innerHTML = '';
    mockMatchMedia();
});

describe('AccordionGroup', () => {
    describe('non-exclusive mode (default)', () => {
        it('allows multiple accordions to be expanded at once', () => {
            const a = makeAccordion(false);
            const b = makeAccordion(false);
            new AccordionGroup([a, b], false);

            a.toggle();
            b.toggle();

            expect(a.isExpanded).toBe(true);
            expect(b.isExpanded).toBe(true);
        });

        it('does not collapse others when one expands', () => {
            const a = makeAccordion(true);
            const b = makeAccordion(false);
            new AccordionGroup([a, b], false);

            b.toggle();

            expect(a.isExpanded).toBe(true);
        });

        it('does not affect others when collapsing', () => {
            const a = makeAccordion(true);
            const b = makeAccordion(true);
            new AccordionGroup([a, b], false);

            a.toggle();

            expect(b.isExpanded).toBe(true);
        });
    });

    describe('exclusive mode', () => {
        it('collapses other accordions when one expands', () => {
            const a = makeAccordion(false);
            const b = makeAccordion(false);
            const c = makeAccordion(false);
            new AccordionGroup([a, b, c], true);

            a.toggle();

            expect(a.isExpanded).toBe(true);
            expect(b.isExpanded).toBe(false);
            expect(c.isExpanded).toBe(false);
        });

        it('collapses the previously open accordion when a new one opens', () => {
            const a = makeAccordion(true);
            const b = makeAccordion(false);
            new AccordionGroup([a, b], true);

            b.toggle();

            expect(b.isExpanded).toBe(true);
            expect(a.isExpanded).toBe(false);
        });

        it('does not collapse others when collapsing (not expanding)', () => {
            const a = makeAccordion(true);
            const b = makeAccordion(true);
            new AccordionGroup([a, b], true);

            a.collapse();

            expect(b.isExpanded).toBe(true);
        });

        it('does not collapse itself when it opens', () => {
            const a = makeAccordion(false);
            const b = makeAccordion(false);
            new AccordionGroup([a, b], true);

            a.toggle();

            expect(a.isExpanded).toBe(true);
        });
    });

    describe('with a single accordion', () => {
        it('works without throwing in exclusive mode', () => {
            const a = makeAccordion(false);

            expect(() => {
                new AccordionGroup([a], true);
                a.toggle();
            }).not.toThrow();

            expect(a.isExpanded).toBe(true);
        });
    });

    describe('with an empty group', () => {
        it('constructs without throwing', () => {
            expect(() => new AccordionGroup([], true)).not.toThrow();
        });
    });
});
