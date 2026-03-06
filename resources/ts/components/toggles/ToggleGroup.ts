import { Toggle } from './Toggle';

export class ToggleGroup {
    private _toggles: Toggle[];
    private _exclusive: boolean;

    constructor(toggles: Toggle[], exclusive: boolean = true) {
        this._toggles = toggles;
        this._exclusive = exclusive;

        for (const toggle of this._toggles) {
            toggle.onChange((changed) => {
                if (!this._exclusive || !changed.active) return;

                for (const other of this._toggles) {
                    if (other !== changed) {
                        other.deactivate();
                    }
                }
            });
        }
    }
}
