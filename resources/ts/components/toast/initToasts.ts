import Toast from './Toast'

export default function initToasts(root: ParentNode = document) {
    // The toast container is commonly wrapped in @persist so it survives
    // wire:navigate transitions. Without this guard, re-running init on
    // every livewire:navigated would construct a second Toast instance on
    // the same still-alive element, doubling its event listeners.
    const nodes = root.querySelectorAll<HTMLElement>(
        '[data-wire-toast]:not([data-wire-toast-initialized])',
    ) as NodeListOf<HTMLElement>

    return Array.from(nodes).map((node) => {
        node.setAttribute('data-wire-toast-initialized', '')

        return new Toast(node)
    })
}
