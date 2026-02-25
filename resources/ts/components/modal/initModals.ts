import { Modal } from './Modal';

export function initModals(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>('[data-wire-modal]') as NodeListOf<HTMLDialogElement>;
    return Array.from(nodes).map((node) => new Modal(node));
}
