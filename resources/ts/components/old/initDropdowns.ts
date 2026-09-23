import { Dropdown } from './Dropdown';

export function initDropdowns(root: ParentNode = document): Dropdown[] {
    const dropdownEls = root.querySelectorAll<HTMLElement>('[data-wire-dropdown]');
    const instances: Dropdown[] = [];

    dropdownEls.forEach((el) => {
        const dropdown = new Dropdown(el);
        instances.push(dropdown);
    });

    return instances;
}
