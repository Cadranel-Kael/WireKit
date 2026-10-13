import { Tree } from './Tree'

const SELECTOR = '[data-wire-tree]'
const INITIALIZED_ATTR = 'data-wire-tree-initialized'

function construct(node: HTMLElement): Tree | null {
    if (node.hasAttribute(INITIALIZED_ATTR)) return null
    node.setAttribute(INITIALIZED_ATTR, '')
    return new Tree(node)
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
