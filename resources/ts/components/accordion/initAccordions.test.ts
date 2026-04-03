import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Accordion } from './Accordion';
import { initAccordions } from './initAccordions';

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

function makeGroupEl(groupId: string, exclusive = false): HTMLElement {
    const groupEl = document.createElement('div');
    groupEl.id = groupId;
    groupEl.dataset.wireExclusive = String(exclusive);
    document.body.appendChild(groupEl);
    return groupEl;
}

function makeAccordionEl(options: {
    groupId?: string;
    expanded?: boolean;
    container?: HTMLElement;
}): HTMLElement {
    const el = document.createElement('div');
    el.dataset.wireAccordion = '';
    el.dataset.wireExpanded = String(options.expanded ?? false);
    el.dataset.wireTransition = 'false';
    if (options.groupId !== undefined) {
        el.dataset.wireGroup = options.groupId;
    }

    const heading = document.createElement('button');
    heading.dataset.wireAccordionHeading = '';
    el.appendChild(heading);

    const content = document.createElement('div');
    content.dataset.wireAccordionContent = '';
    el.appendChild(content);

    const container = options.container ?? document.body;
    container.appendChild(el);
    return el;
}

beforeEach(() => {
    document.body.innerHTML = '';
    mockMatchMedia();
});

describe('initAccordions()', () => {
    describe('discovery', () => {
        it('returns an empty array when no accordions are on the page', () => {
            const result = initAccordions();

            expect(result).toEqual([]);
        });

        it('returns one Accordion per [data-wire-accordion] element', () => {
            makeAccordionEl({});
            makeAccordionEl({});
            makeAccordionEl({});

            const result = initAccordions();

            expect(result).toHaveLength(3);
            expect(result[0]).toBeInstanceOf(Accordion);
        });

        it('searches inside a provided root element', () => {
            const root = document.createElement('div');
            document.body.appendChild(root);

            makeAccordionEl({ container: root });
            makeAccordionEl({}); // outside root

            const result = initAccordions(root);

            expect(result).toHaveLength(1);
        });

        it('defaults to document as root', () => {
            makeAccordionEl({});

            const result = initAccordions(document);

            expect(result).toHaveLength(1);
        });
    });

    describe('grouping', () => {
        it('wires accordions in the same group together in exclusive mode', () => {
            const groupId = 'test-group-exclusive';
            makeGroupEl(groupId, true);
            makeAccordionEl({ groupId });
            makeAccordionEl({ groupId });

            const [a, b] = initAccordions();

            a.toggle();
            b.toggle();

            expect(a.isExpanded).toBe(false);
            expect(b.isExpanded).toBe(true);
        });

        it('does not enforce exclusivity when exclusive is false', () => {
            const groupId = 'test-group-shared';
            makeGroupEl(groupId, false);
            makeAccordionEl({ groupId });
            makeAccordionEl({ groupId });

            const [a, b] = initAccordions();

            a.toggle();
            b.toggle();

            expect(a.isExpanded).toBe(true);
            expect(b.isExpanded).toBe(true);
        });

        it('keeps accordions from different groups independent', () => {
            const groupA = 'group-a';
            const groupB = 'group-b';
            makeGroupEl(groupA, true);
            makeGroupEl(groupB, true);

            makeAccordionEl({ groupId: groupA });
            makeAccordionEl({ groupId: groupA });
            makeAccordionEl({ groupId: groupB });
            makeAccordionEl({ groupId: groupB });

            const [a1, a2, b1, b2] = initAccordions();

            a1.toggle();
            b1.toggle();

            // Both group leaders can be open simultaneously
            expect(a1.isExpanded).toBe(true);
            expect(b1.isExpanded).toBe(true);

            // Within each group, expanding the second collapses the first
            a2.toggle();
            expect(a1.isExpanded).toBe(false);
            expect(a2.isExpanded).toBe(true);

            b2.toggle();
            expect(b1.isExpanded).toBe(false);
            expect(b2.isExpanded).toBe(true);
        });

        it('initialises accordions with no group without errors', () => {
            makeAccordionEl({});
            makeAccordionEl({});

            expect(() => initAccordions()).not.toThrow();

            const [a, b] = initAccordions();
            a.toggle();

            expect(a.isExpanded).toBe(true);
            expect(b.isExpanded).toBe(false);
        });
    });
});
