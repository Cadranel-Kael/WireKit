import { Input } from './Input';

export function initInputs(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLInputElement>('[data-wire-input-container]');
    return Array.from(nodes).map((node) => new Input(node));
}
