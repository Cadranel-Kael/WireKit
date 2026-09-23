import { Tree } from './Tree';

export function initTrees(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>('[data-wire-tree]');

    return Array.from(nodes).map((node) => new Tree(node));
}
