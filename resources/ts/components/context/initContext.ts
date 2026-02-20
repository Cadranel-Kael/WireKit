import { Context } from './Context';

export function initContext(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>('[data-wire-context]');
    const instances: Context[] = [];

    nodes.forEach((el) => {
        const context = new Context(el);
        instances.push(context);
    });

    return instances;
}
