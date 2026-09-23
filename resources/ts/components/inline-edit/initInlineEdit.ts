import { InlineEdit } from './InlineEdit';

const SELECTOR = '[data-wire-inline-edit]';
const INITIALIZED_ATTR = 'data-wire-inline-edit-initialized';

function construct(el: HTMLElement): InlineEdit | null {
    if (el.hasAttribute(INITIALIZED_ATTR)) return null;

    el.setAttribute(INITIALIZED_ATTR, '');

    return new InlineEdit(el);
}

export function initInlineEdit(root: ParentNode = document): InlineEdit[] {
    const els = root.querySelectorAll<HTMLElement>(SELECTOR);
    const instances: InlineEdit[] = [];

    if (root instanceof HTMLElement && root.matches(SELECTOR)) {
        const instance = construct(root);
        if (instance) instances.push(instance);
    }

    els.forEach((el) => {
        const instance = construct(el);
        if (instance) instances.push(instance);
    });

    return instances;
}
