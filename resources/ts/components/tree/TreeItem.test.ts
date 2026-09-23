import { beforeEach, describe, expect, it } from 'vitest';
import { TreeItem } from './TreeItem';

function makeEl(options: { expanded?: boolean; disabled?: boolean; withChildren?: boolean; asLink?: boolean } = {}): HTMLElement {
    const el = document.createElement('li');
    el.dataset.wireTreeItem = '';
    el.dataset.wireExpanded = String(options.expanded ?? false);
    if (options.disabled) {
        el.setAttribute('aria-disabled', 'true');
    }

    const row = document.createElement(options.asLink ? 'a' : 'div');
    row.dataset.wireTreeRow = '';
    el.appendChild(row);

    if (options.withChildren) {
        const toggle = document.createElement('button');
        toggle.dataset.wireTreeToggle = '';
        row.appendChild(toggle);

        const group = document.createElement('ul');
        group.dataset.wireTreeGroup = '';
        el.appendChild(group);
    }

    document.body.appendChild(el);
    return el;
}

beforeEach(() => {
    document.body.innerHTML = '';
});

describe('TreeItem', () => {
    describe('initial state', () => {
        it('initialises as collapsed when data-wire-expanded is false', () => {
            const item = new TreeItem(makeEl({ withChildren: true, expanded: false }));

            expect(item.isExpanded).toBe(false);
        });

        it('initialises as expanded when data-wire-expanded is true', () => {
            const item = new TreeItem(makeEl({ withChildren: true, expanded: true }));

            expect(item.isExpanded).toBe(true);
        });

        it('reports whether it has children', () => {
            const withChildren = new TreeItem(makeEl({ withChildren: true }));
            const leaf = new TreeItem(makeEl({ withChildren: false }));

            expect(withChildren.hasChildren).toBe(true);
            expect(leaf.hasChildren).toBe(false);
        });
    });

    describe('toggle', () => {
        it('expands a collapsed item', () => {
            const item = new TreeItem(makeEl({ withChildren: true, expanded: false }));

            item.toggle();

            expect(item.isExpanded).toBe(true);
        });

        it('collapses an expanded item', () => {
            const item = new TreeItem(makeEl({ withChildren: true, expanded: true }));

            item.toggle();

            expect(item.isExpanded).toBe(false);
        });

        it('does nothing on a leaf item', () => {
            const item = new TreeItem(makeEl({ withChildren: false }));

            item.toggle();

            expect(item.isExpanded).toBe(false);
        });

        it('does nothing when disabled', () => {
            const item = new TreeItem(makeEl({ withChildren: true, disabled: true }));

            item.toggle();

            expect(item.isExpanded).toBe(false);
        });

        it('hides the group when collapsed and shows it when expanded', () => {
            const el = makeEl({ withChildren: true, expanded: false });
            const item = new TreeItem(el);
            const group = el.querySelector('[data-wire-tree-group]') as HTMLElement;

            expect(group.style.display).toBe('none');

            item.expand();

            expect(group.style.display).toBe('');
        });

        it('notifies listeners on change', () => {
            const item = new TreeItem(makeEl({ withChildren: true }));
            let called = 0;
            item.onChange(() => called++);

            item.toggle();

            expect(called).toBe(1);
        });
    });

    describe('click handling', () => {
        it('toggles when the row itself is clicked and is not a link', () => {
            const el = makeEl({ withChildren: true, expanded: false });
            const item = new TreeItem(el);
            const row = el.querySelector('[data-wire-tree-row]') as HTMLElement;

            row.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(item.isExpanded).toBe(true);
        });

        it('toggles when the toggle button is clicked', () => {
            const el = makeEl({ withChildren: true, expanded: false });
            const item = new TreeItem(el);
            const toggle = el.querySelector('[data-wire-tree-toggle]') as HTMLElement;

            toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(item.isExpanded).toBe(true);
        });

        it('does not toggle when the row is a link', () => {
            const el = makeEl({ withChildren: true, expanded: false, asLink: true });
            const item = new TreeItem(el);
            const row = el.querySelector('[data-wire-tree-row]') as HTMLElement;

            row.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(item.isExpanded).toBe(false);
        });
    });
});
