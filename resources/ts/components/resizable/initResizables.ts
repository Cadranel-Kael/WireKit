import { Resizable } from './Resizable'

export function initResizables(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>('[data-wire-resizable]')

    return Array.from(nodes).map((node) => new Resizable(node))
}
