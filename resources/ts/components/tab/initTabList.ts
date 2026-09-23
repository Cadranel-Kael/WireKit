import { TabGroup } from './TabGroup'

export function initTabList(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>('[data-wire-tab-group]')
    return Array.from(nodes).map((node) => new TabGroup(node))
}
