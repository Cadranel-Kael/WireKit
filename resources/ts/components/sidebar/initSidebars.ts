import { Sidebar } from './Sidebar'

const SELECTOR = '[data-wire-sidebar]'
const INITIALIZED_ATTR = 'data-wire-sidebar-initialized'

function construct(el: HTMLElement): Sidebar | null {
    if (el.hasAttribute(INITIALIZED_ATTR)) return null

    el.setAttribute(INITIALIZED_ATTR, '')

    return new Sidebar(el)
}

export function initSidebars(root: ParentNode = document): Sidebar[] {
    const els = root.querySelectorAll<HTMLElement>(SELECTOR)
    const instances: Sidebar[] = []

    if (root instanceof HTMLElement && root.matches(SELECTOR)) {
        const instance = construct(root)
        if (instance) instances.push(instance)
    }

    els.forEach((el) => {
        const instance = construct(el)
        if (instance) instances.push(instance)
    })

    return instances
}
