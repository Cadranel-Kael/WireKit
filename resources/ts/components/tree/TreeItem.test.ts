import { beforeEach, describe, expect, it } from 'vitest';
import { TreeItem } from './TreeItem';

function makeEl(
    options: {
        expanded?: boolean;
        disabled?: boolean;
        withChildren?: boolean;
        asLink?: boolean;
        alwaysRenderToggle?: boolean;
        variant?: string;
    } = {},
): HTMLElement {
    const el = document.createElement('li');
    el.dataset.wireTreeItem = '';
    el.dataset.wireExpanded = String(options.expanded ?? false);
    if (options.disabled) {
        el.setAttribute('aria-disabled', 'true');
    }

    const row = document.createElement(options.asLink ? 'a' : 'div');
    row.dataset.wireTreeRow = '';
    el.appendChild(row);

    if (options.withChildren || options.alwaysRenderToggle) {
        const toggle = document.createElement('button');
        toggle.dataset.wireTreeToggle = '';
        row.appendChild(toggle);
    }

    if (options.withChildren) {
        const group = document.createElement('ul');
        group.dataset.wireTreeGroup = '';
        el.appendChild(group);
    }

    if (options.variant) {
        const tree = document.createElement('ol');
        tree.dataset.wireTree = '';
        tree.dataset.wireTreeVariant = options.variant;
        tree.appendChild(el);
        document.body.appendChild(tree);
        return el;
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

    describe('toggle visibility for a leaf item with a pre-rendered toggle', () => {
        it('hides it with visibility (reserving its space) for a "file" variant tree', () => {
            const el = makeEl({ withChildren: false, alwaysRenderToggle: true, variant: 'file' });
            new TreeItem(el);
            const toggle = el.querySelector('[data-wire-tree-toggle]') as HTMLElement;

            expect(toggle.style.visibility).toBe('hidden');
            expect(toggle.style.display).not.toBe('none');
        });

        it('hides it with display:none (no reserved space) for a "list" variant tree', () => {
            const el = makeEl({ withChildren: false, alwaysRenderToggle: true, variant: 'list' });
            new TreeItem(el);
            const toggle = el.querySelector('[data-wire-tree-toggle]') as HTMLElement;

            expect(toggle.style.display).toBe('none');
        });

        it('shows a pre-rendered toggle once a group is added and the item is refreshed', () => {
            const el = makeEl({ withChildren: false, alwaysRenderToggle: true, variant: 'list' });
            const toggle = el.querySelector('[data-wire-tree-toggle]') as HTMLElement;
            new TreeItem(el);
            expect(toggle.style.display).toBe('none');

            const group = document.createElement('ul');
            group.dataset.wireTreeGroup = '';
            el.appendChild(group);
            el.dataset.wireExpanded = 'true';

            const item = new TreeItem(el);

            expect(item.hasChildren).toBe(true);
            expect(toggle.style.display).toBe('');
            expect(toggle.style.transform).toBe('rotate(90deg)');
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
