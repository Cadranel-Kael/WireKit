import { Accordion } from './Accordion';

export class AccordionGroup {
    constructor(accordions: Accordion[], exclusive: boolean = false) {
        for (const accordion of accordions) {
            accordion.onChange((changed) => {
                if (!exclusive || !changed.isExpanded) return;
                for (const other of accordions) {
                    if (other !== changed) {
                        other.collapse();
                    }
                }
            });
        }
    }
}
