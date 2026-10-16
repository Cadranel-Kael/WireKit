import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Tree } from './Tree'

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
function makeTree(expandA = true, options: { sortable?: boolean; nested?: boolean } = {}): HTMLElement {
    const root = document.createElement('ul')
    root.dataset.wireTree = ''
    if (options.sortable) root.dataset.wireSortable = ''
    if (options.nested) root.dataset.wireNested = ''

    function makeItem(withChildren: boolean, expanded = false, label = ''): HTMLElement {
        const li = document.createElement('li')
        li.dataset.wireTreeItem = ''
        li.dataset.wireExpanded = String(expanded)

        const row = document.createElement('div')
        row.dataset.wireTreeRow = ''
        const span = document.createElement('span')
        span.textContent = label
        row.appendChild(span)
        li.appendChild(row)

        if (withChildren) {
            const toggle = document.createElement('button')
            toggle.dataset.wireTreeToggle = ''
            row.appendChild(toggle)

            const group = document.createElement('ul')
            group.dataset.wireTreeGroup = ''
            li.appendChild(group)
        }

        return li
    }

    const itemA = makeItem(true, expandA, 'A')
    const groupA = itemA.querySelector('[data-wire-tree-group]') as HTMLElement
    const itemA1 = makeItem(false, false, 'A1')
    const itemA2 = makeItem(false, false, 'A2')
    groupA.appendChild(itemA1)
    groupA.appendChild(itemA2)

    const itemB = makeItem(false, false, 'B')

    root.appendChild(itemA)
    root.appendChild(itemB)
    document.body.appendChild(root)

    return root
}

beforeEach(() => {
    document.body.innerHTML = ''
    ;(globalThis as any).Livewire = { dispatch: () => {} }
})

describe('Tree', () => {
    describe('roving tabindex', () => {
        it('gives only the first visible item a tabindex of 0', () => {
            const root = makeTree(true)
            new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))

            expect(rows[0].tabIndex).toBe(0)
            expect(rows.slice(1).every((row) => row.tabIndex === -1)).toBe(true)
        })

        it('does not count collapsed children as focusable', () => {
            const root = makeTree(false)
            const tree = new Tree(root)

            expect(tree.items.filter((i) => i.hasChildren)[0].isExpanded).toBe(false)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            // Item A's row is index 0, item B's row is index 3 (children hidden)
            expect(rows[0].tabIndex).toBe(0)
        })
    })

    describe('keyboard navigation', () => {
        it('ArrowDown moves the active item to the next visible sibling', () => {
            const root = makeTree(true)
            new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

            expect(document.activeElement).toBe(rows[1])
        })

        it('ArrowRight expands a collapsed branch without moving focus', () => {
            const root = makeTree(false)
            const tree = new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

            expect(tree.items[0].isExpanded).toBe(true)
            expect(document.activeElement).toBe(rows[0])
        })

        it('ArrowRight on an expanded branch moves focus to its first child', () => {
            const root = makeTree(true)
            new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

            expect(document.activeElement).toBe(rows[1])
        })

        it('ArrowLeft collapses an expanded branch', () => {
            const root = makeTree(true)
            const tree = new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))

            expect(tree.items[0].isExpanded).toBe(false)
        })

        it('ArrowLeft on a child moves focus to its parent', () => {
            const root = makeTree(true)
            new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[1].focus()
            rows[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))

            expect(document.activeElement).toBe(rows[0])
        })

        it('End moves focus to the last visible item', () => {
            const root = makeTree(true)
            new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))

            expect(document.activeElement).toBe(rows[rows.length - 1])
        })

        it('Home moves focus to the first visible item', () => {
            const root = makeTree(true)
            new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[rows.length - 1].focus()
            rows[rows.length - 1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))

            expect(document.activeElement).toBe(rows[0])
        })

        it('Enter activates the row (same as a mouse click), e.g. toggling a branch with no link', () => {
            const root = makeTree(true)
            const tree = new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

            expect(tree.items[0].isExpanded).toBe(false)
        })

        it('Enter clicks a nested link instead of the row, when the row has one', () => {
            const root = makeTree(true)
            new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            const row = rows[1]
            const link = document.createElement('a')
            link.href = '#'
            row.appendChild(link)
            const clickSpy = vi.fn()
            link.addEventListener('click', clickSpy)

            row.focus()
            row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

            expect(clickSpy).toHaveBeenCalledTimes(1)
        })

        it('Space toggles a branch when the tree is not sortable or nested', () => {
            const root = makeTree(false)
            const tree = new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))

            expect(tree.items[0].isExpanded).toBe(true)
        })
    })

    describe('keyboard move mode', () => {
        it('Space grabs the active item and marks it aria-grabbed', () => {
            const root = makeTree(true, { sortable: true })
            new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))

            expect(rows[0].getAttribute('aria-grabbed')).toBe('true')
        })

        it('ArrowDown in move mode swaps the grabbed item with its next sibling', () => {
            const root = makeTree(true, { sortable: true })
            new Tree(root)

            const items = () => Array.from(root.children).filter((c) => c.hasAttribute('data-wire-tree-item'))
            const [itemA, itemB] = items()
            const rowA = itemA.querySelector('[data-wire-tree-row]') as HTMLElement

            rowA.focus()
            rowA.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
            rowA.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

            expect(items()[0]).toBe(itemB)
            expect(items()[1]).toBe(itemA)
        })

        it('Enter in move mode drops the item and exits move mode', () => {
            const root = makeTree(true, { sortable: true })
            const tree = new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

            const items = Array.from(root.children).filter((c) => c.hasAttribute('data-wire-tree-item'))
            const labels = items.map((i) => i.querySelector('[data-wire-tree-row] span')?.textContent)
            expect(labels).toEqual(['B', 'A'])

            // Move mode has exited: Space on the newly-focused item grabs it fresh rather than being swallowed.
            const activeRow = document.activeElement as HTMLElement
            expect(activeRow.getAttribute('aria-grabbed')).toBeNull()
        })

        it('Escape in move mode restores the item to its original position', () => {
            const root = makeTree(true, { sortable: true })
            new Tree(root)

            const items = () => Array.from(root.children).filter((c) => c.hasAttribute('data-wire-tree-item'))
            const [itemA] = items()
            const rowA = itemA.querySelector('[data-wire-tree-row]') as HTMLElement

            rowA.focus()
            rowA.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
            rowA.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
            rowA.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

            expect(items()[0]).toBe(itemA)
            expect(itemA.querySelector('[data-wire-tree-row]')?.getAttribute('aria-grabbed')).toBeNull()
        })

        it('ArrowRight in move mode indents the item under its previous sibling, only for nested trees', () => {
            const root = makeTree(true, { nested: true })
            new Tree(root)

            const items = () => Array.from(root.children).filter((c) => c.hasAttribute('data-wire-tree-item'))
            const itemB = items()[1] as HTMLElement
            const rowB = itemB.querySelector('[data-wire-tree-row]') as HTMLElement

            rowB.focus()
            rowB.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
            rowB.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
            rowB.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

            const itemA = items()[0] as HTMLElement
            const groupA = itemA.querySelector('[data-wire-tree-group]') as HTMLElement
            expect(Array.from(groupA.children)).toContain(itemB)
        })

        it('keeps focus on the row (and move mode alive) after indenting, instead of losing it to the reparent', () => {
            const root = makeTree(true, { nested: true })
            const tree = new Tree(root)

            const items = () => Array.from(root.children).filter((c) => c.hasAttribute('data-wire-tree-item'))
            const itemB = items()[1] as HTMLElement
            const rowB = itemB.querySelector('[data-wire-tree-row]') as HTMLElement

            rowB.focus()
            rowB.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
            rowB.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

            // Reparenting the row into its new group must not drop focus to
            // <body> -- if it did, this._el's keydown listener would never
            // see another key, silently freezing move mode.
            expect(document.activeElement).toBe(rowB)
            expect((tree as unknown as { _movingItem: unknown })._movingItem).toBeTruthy()

            // Prove move mode is actually still listening, not just that
            // the fields look right: Escape has to make it all the way
            // through handleKeydown to restore the original position.
            rowB.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
            const itemA = items()[0] as HTMLElement
            const groupA = itemA.querySelector('[data-wire-tree-group]') as HTMLElement
            expect(items()[1]).toBe(itemB)
            expect(Array.from(groupA.children)).not.toContain(itemB)
        })

        it('ArrowRight in move mode does nothing for a sortable-but-not-nested tree', () => {
            const root = makeTree(true, { sortable: true })
            new Tree(root)

            const items = () => Array.from(root.children).filter((c) => c.hasAttribute('data-wire-tree-item'))
            const itemB = items()[1] as HTMLElement
            const rowB = itemB.querySelector('[data-wire-tree-row]') as HTMLElement

            rowB.focus()
            rowB.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
            rowB.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

            expect(items()).toHaveLength(2)
            expect(items()[1]).toBe(itemB)
        })
    })

    describe('refresh()', () => {
        it('picks up items added to the DOM after construction', async () => {
            const root = makeTree(true)
            const tree = new Tree(root)

            expect(tree.items).toHaveLength(4)

            const newItem = document.createElement('li')
            newItem.dataset.wireTreeItem = ''
            const newRow = document.createElement('div')
            newRow.dataset.wireTreeRow = ''
            newItem.appendChild(newRow)
            root.appendChild(newItem)

            tree.refresh()
            await new Promise((resolve) => setTimeout(resolve, 0))

            expect(tree.items).toHaveLength(5)
        })

        it('drops items removed from the DOM', async () => {
            const root = makeTree(true)
            const tree = new Tree(root)

            const itemB = Array.from(root.children).find((c) =>
                c.hasAttribute('data-wire-tree-item') && c.querySelector('span')?.textContent === 'B',
            ) as HTMLElement
            itemB.remove()

            tree.refresh()
            await new Promise((resolve) => setTimeout(resolve, 0))

            expect(tree.items).toHaveLength(3)
            expect(tree.items.map((i) => i.el)).not.toContain(itemB)
        })

        it('coalesces multiple calls into a single rebuild', async () => {
            const root = makeTree(true)
            const tree = new Tree(root)
            const spy = vi.spyOn(tree as unknown as { refreshItems: () => void }, 'refreshItems')

            tree.refresh()
            tree.refresh()
            tree.refresh()

            await new Promise((resolve) => setTimeout(resolve, 0))

            expect(spy).toHaveBeenCalledTimes(1)
        })

        it('preserves the active item across a refresh', async () => {
            const root = makeTree(true)
            const tree = new Tree(root)

            // Focus A2's row (third row in DOM order: A, A1, A2, B)
            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[2].focus()
            expect(document.activeElement).toBe(rows[2])

            // Add a sibling at the end -- a morph that shouldn't move focus
            const newItem = document.createElement('li')
            newItem.dataset.wireTreeItem = ''
            const newRow = document.createElement('div')
            newRow.dataset.wireTreeRow = ''
            newItem.appendChild(newRow)
            root.appendChild(newItem)

            tree.refresh()
            await new Promise((resolve) => setTimeout(resolve, 0))

            expect(document.activeElement).toBe(rows[2])
        })

        it('resets the active item when its element is removed', async () => {
            const root = makeTree(true)
            const tree = new Tree(root)

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[2].focus()
            expect(document.activeElement).toBe(rows[2])

            // Remove the active item's element
            rows[2].closest('[data-wire-tree-item]')?.remove()

            tree.refresh()
            await new Promise((resolve) => setTimeout(resolve, 0))

            // Focus should fall back to the first visible item
            expect(document.activeElement).not.toBe(rows[2])
        })

        it('reinitializes Sortable instances after a refresh', async () => {
            const root = makeTree(true, { sortable: true })
            const tree = new Tree(root)

            const sortableInstances = () => (tree as unknown as { _sortableInstances: unknown[] })._sortableInstances
            // Root list + A's children group = 2 instances
            expect(sortableInstances()).toHaveLength(2)

            // Simulate a morph adding a new group under item B
            const itemB = Array.from(root.children).find((c) =>
                c.hasAttribute('data-wire-tree-item') && c.querySelector('span')?.textContent === 'B',
            ) as HTMLElement
            const newGroup = document.createElement('ul')
            newGroup.dataset.wireTreeGroup = ''
            itemB.appendChild(newGroup)

            const oldInstances = [...sortableInstances()]

            tree.refresh()
            await new Promise((resolve) => setTimeout(resolve, 0))

            // Root + A's group + B's new group = 3 instances, all fresh
            expect(sortableInstances()).toHaveLength(3)
            expect(sortableInstances()[0]).not.toBe(oldInstances[0])
        })

        it('does nothing when the tree element has been removed', async () => {
            const root = makeTree(true)
            const tree = new Tree(root)
            const itemCount = tree.items.length

            root.remove()

            tree.refresh()
            await new Promise((resolve) => setTimeout(resolve, 0))

            // Items list is untouched -- the refresh was skipped
            expect(tree.items).toHaveLength(itemCount)
        })
    })

    describe('detached items (morph removals)', () => {
        it('excludes items whose element is no longer connected from keyboard navigation', () => {
            const root = makeTree(true)
            const tree = new Tree(root)

            // Simulate a Livewire morph removing the middle item (A1) without
            // calling refresh(): the TreeItem stays in _items but its <li> is
            // detached. Keyboard nav must skip it.
            const itemA1 = tree.items[1]
            itemA1.el.remove()

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

            // Focus should land on A2's row (index 2 in the full DOM query),
            // not on the detached A1 row.
            expect(document.activeElement).toBe(rows[1])
            expect(document.activeElement?.textContent).toContain('A2')
        })

        it('still includes connected items after a sibling is detached', () => {
            const root = makeTree(true)
            const tree = new Tree(root)

            tree.items[1].el.remove()

            const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-wire-tree-row]'))
            rows[0].focus()
            rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))

            expect(document.activeElement).toBe(rows[rows.length - 1])
        })
    })
})
