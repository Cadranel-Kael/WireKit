import { Modal } from './Modal';

export function initModals(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>('[data-wire-modal]') as NodeListOf<HTMLDialogElement>;
    Livewire.on('modal:show', ({ name }: { name: string }) => {
        const modal = document.getElementById(name) as HTMLDialogElement | null;
        modal?.showModal();
    });

    Livewire.on('modal:close', ({ name }: { name: string }) => {
        const modal = document.getElementById(name) as HTMLDialogElement | null;
        modal?.close();
    });
    return Array.from(nodes).map((node) => new Modal(node));
}
