import { Tree } from './Tree'

const SELECTOR = '[data-wire-tree]'
const INITIALIZED_ATTR = 'data-wire-tree-initialized'

const registry = new WeakMap<HTMLElement, Tree>()

/**
 * Returns the Tree instance managing the given tree element, if one has
 * been initialised. Used by the morph hooks in index.ts to resync a tree
 * when Livewire adds or removes elements inside it.
 */
export function getTree(el: HTMLElement): Tree | undefined {
    return registry.get(el)
}

function construct(node: HTMLElement): Tree | null {
    if (node.hasAttribute(INITIALIZED_ATTR)) return null
    node.setAttribute(INITIALIZED_ATTR, '')
    const tree = new Tree(node)
    registry.set(node, tree)
    return tree
}

export function initTrees(root: ParentNode = document): Tree[] {
    const instances: Tree[] = []

    if (root instanceof HTMLElement && root.matches(SELECTOR)) {
        const instance = construct(root)
        if (instance) instances.push(instance)
    }

    root.querySelectorAll<HTMLElement>(SELECTOR).forEach((node) => {
        const instance = construct(node)
        if (instance) instances.push(instance)
    })

    return instances
}
