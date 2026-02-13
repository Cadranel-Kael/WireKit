import { Tooltip } from './Tooltip';

export function initTooltips(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLButtonElement>('[data-wire-tooltip]');
    return Array.from(nodes).map((node) => new Tooltip(node));
}
