import { Accordion } from './Accordion';
import { AccordionGroup } from './AccordionGroup';

export function initAccordions(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLButtonElement>('[data-wire-accordion]');
    const accordions = Array.from(nodes).map((node) => new Accordion(node));

    const groups = new Map<string, Accordion[]>();

    for (const accordion of accordions) {
        const group = accordion['el'].dataset.wireGroup;
        if (!group) continue;
        groups.set(group, [...(groups.get(group) ?? []), accordion]);
    }

    for (const [_, groupAccordions] of groups) {
        let exclusive = false;
        if (groupAccordions[0].groupId) {
            exclusive = document.getElementById(groupAccordions[0].groupId)?.dataset.wireExclusive === 'true';
        }
        new AccordionGroup(groupAccordions, exclusive);
    }

    return accordions;
}
