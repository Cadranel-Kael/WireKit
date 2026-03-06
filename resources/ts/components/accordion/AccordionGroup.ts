import { Accordion } from './Accordion';

export class AccordionGroup {
    private _accordions: Accordion[];
    private _exclusive: boolean;

    constructor(accordions: Accordion[], exclusive: boolean = false) {
        this._accordions = accordions;
        this._exclusive = exclusive;

        for (const accordion of this._accordions) {
            accordion.onChange((changed) => {
                if (!this._exclusive || !changed.isExpanded) return;
                for (const other of this._accordions) {
                    if (other !== changed) {
                        other.collapse();
                    }
                }
            });
        }
    }
}
