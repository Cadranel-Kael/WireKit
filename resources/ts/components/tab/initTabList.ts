import { TabList } from './TabList';

export function initTabList(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>('[data-wire-tabs]');
    return Array.from(nodes).map((node) => new TabList(node));
}
