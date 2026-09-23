import { beforeEach, describe, expect, it } from 'vitest';
import { Tree } from './Tree';

/**
 * Builds:
 * <ul data-wire-tree>
 *   <li data-wire-tree-item> A (branch, expanded by default)
 *     <ul data-wire-tree-group>
 *       <li data-wire-tree-item> A1 (leaf)
 *       <li data-wire-tree-item> A2 (leaf)
 *     </ul>
 *   <li data-wire-tree-item> B (leaf)
 */
function makeTree(expandA = true): HTMLElement {
    const root = document.createElement('ul');
    root.dataset.wireTree = '';

    function makeItem(withChildren: boolean, expanded = false): HTMLElement {
        const li = document.createElement('li');
        li.dataset.wireTreeItem = '';
        li.dataset.wireExpanded = String(expanded);

        const row = document.createElement('div');
        row.dataset.wireTreeRow = '';
        li.appendChild(row);

        if (withChildren) {
            const toggle = document.createElement('button');
            toggle.dataset.wireTreeToggle = '';
            row.appendChild(toggle);

            const group = document.createElement('ul');
            group.dataset.wireTreeGroup = '';
            li.appendChild(group);
        }

        return li;
    }

    const itemA = makeItem(true, expandA);
    const groupA = itemA.querySelector('[data-wire-tree-group]') as HTMLElement;
    const itemA1 = makeItem(false);
    const itemA2 = makeItem(false);
    groupA.appendChild(itemA1);
    groupA.appendChild(itemA2);

    const itemB = makeItem(false);

    root.appendChild(itemA);
    root.appendChild(itemB);
    document.body.appendChild(root);

    return root;
}

beforeEach(() => {
    document.body.innerHTML = '';
});

describe('Tree', () => {
    describe('roving tabindex', () => {
        it('gives only the first visible item a tabindex of 0', () => {
            const root = makeTree(true);
            new Tree(root);

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'));

            expect(rows[0].tabIndex).toBe(0);
            expect(rows.slice(1).every((row) => row.tabIndex === -1)).toBe(true);
        });

        it('does not count collapsed children as focusable', () => {
            const root = makeTree(false);
            const tree = new Tree(root);

            expect(tree.items.filter((i) => i.hasChildren)[0].isExpanded).toBe(false);

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'));
            // Item A's row is index 0, item B's row is index 3 (children hidden)
            expect(rows[0].tabIndex).toBe(0);
        });
    });

    describe('keyboard navigation', () => {
        it('ArrowDown moves the active item to the next visible sibling', () => {
            const root = makeTree(true);
            new Tree(root);

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'));
            rows[0].focus();
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

            expect(document.activeElement).toBe(rows[1]);
        });

        it('ArrowRight expands a collapsed branch without moving focus', () => {
            const root = makeTree(false);
            const tree = new Tree(root);

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'));
            rows[0].focus();
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

            expect(tree.items[0].isExpanded).toBe(true);
            expect(document.activeElement).toBe(rows[0]);
        });

        it('ArrowRight on an expanded branch moves focus to its first child', () => {
            const root = makeTree(true);
            new Tree(root);

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'));
            rows[0].focus();
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

            expect(document.activeElement).toBe(rows[1]);
        });

        it('ArrowLeft collapses an expanded branch', () => {
            const root = makeTree(true);
            const tree = new Tree(root);

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'));
            rows[0].focus();
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

            expect(tree.items[0].isExpanded).toBe(false);
        });

        it('ArrowLeft on a child moves focus to its parent', () => {
            const root = makeTree(true);
            new Tree(root);

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'));
            rows[1].focus();
            rows[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

            expect(document.activeElement).toBe(rows[0]);
        });

        it('End moves focus to the last visible item', () => {
            const root = makeTree(true);
            new Tree(root);

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'));
            rows[0].focus();
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));

            expect(document.activeElement).toBe(rows[rows.length - 1]);
        });

        it('Home moves focus to the first visible item', () => {
            const root = makeTree(true);
            new Tree(root);

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'));
            rows[rows.length - 1].focus();
            rows[rows.length - 1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));

            expect(document.activeElement).toBe(rows[0]);
        });
    });
});
