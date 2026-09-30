import { Tree } from './Tree'

const SELECTOR = '[data-wire-tree]'
const INITIALIZED_ATTR = 'data-wire-tree-initialized'

export function initTrees(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>(SELECTOR)

    return Array.from(nodes)
        .filter((node) => !node.hasAttribute(INITIALIZED_ATTR))
        .map((node) => {
            node.setAttribute(INITIALIZED_ATTR, '')
            return new Tree(node)
        })
}
