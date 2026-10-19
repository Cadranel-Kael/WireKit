import { Dropdown } from './Dropdown';

const SELECTOR = '[data-wire-dropdown]'
const INITIALIZED_ATTR = 'data-wire-dropdown-initialized'

const registry = new WeakMap<HTMLElement, Dropdown>()

/**
 * Returns the Dropdown instance managing the given dropdown element, if one
 * has been initialised.
 */
export function getDropdown(el: HTMLElement): Dropdown | undefined {
    return registry.get(el)
}

function construct(node: HTMLElement): Dropdown | null {
    if (node.hasAttribute(INITIALIZED_ATTR)) return null
    node.setAttribute(INITIALIZED_ATTR, '')
    const dropdown = new Dropdown(node)
    registry.set(node, dropdown)
    return dropdown
}

export function initDropdowns(root: ParentNode = document): Dropdown[] {
    const instances: Dropdown[] = []

    if (root instanceof HTMLElement && root.matches(SELECTOR)) {
        const instance = construct(root)
        if (instance) instances.push(instance)
    }

    root.querySelectorAll<HTMLElement>(SELECTOR).forEach((node) => {
        const instance = construct(node)
        if (instance) instances.push(instance)
    })

    return instances
}
