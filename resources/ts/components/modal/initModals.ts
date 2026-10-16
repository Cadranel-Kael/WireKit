import { Modal, MODAL_INSTANCE_KEY } from './Modal';

const SELECTOR = '[data-wire-modal]';

type ModalElement = HTMLDialogElement & { [MODAL_INSTANCE_KEY]?: Modal };

function construct(el: HTMLDialogElement): Modal | null {
    // The constructor stores the instance on the element; a dialog that
    // already has one is left alone so re-running init (e.g. from the
    // morph.added hook) never double-binds.
    if ((el as ModalElement)[MODAL_INSTANCE_KEY]) return null;

    return new Modal(el);
}

let livewireListenersTarget: unknown = null;

function registerLivewireListeners() {
    // initModals() runs on every livewire:navigated and every morph.added,
    // but these two handlers are global -- register them once per Livewire
    // instance or they would stack a duplicate on every morph.
    if (livewireListenersTarget === Livewire) return;
    livewireListenersTarget = Livewire;

    Livewire.on('modal:show', ({ name }: { name: string }) => {
        const modal = document.getElementById(name) as HTMLDialogElement | null;
        modal?.showModal();
    });

    Livewire.on('modal:close', ({ name }: { name: string }) => {
        const modal = document.getElementById(name) as HTMLDialogElement | null;
        modal?.close();
    });
}

export function initModals(root: ParentNode = document): Modal[] {
    registerLivewireListeners();

    const instances: Modal[] = [];

    if (root instanceof HTMLElement && root.matches(SELECTOR)) {
        const instance = construct(root as HTMLDialogElement);
        if (instance) instances.push(instance);
    }

    root.querySelectorAll<HTMLDialogElement>(SELECTOR).forEach((el) => {
        const instance = construct(el);
        if (instance) instances.push(instance);
    });

    return instances;
}
