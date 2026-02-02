import { Toggle } from './Toggle';

export class ToggleGroup {
    constructor(
        private toggles: Toggle[],
        private exclusive: boolean = true,
    ) {
        for (const toggle of toggles) {
            toggle.onChange((changed) => {
                if (!exclusive || !changed.isActive) return;

                for (const other of toggles) {
                    if (other !== changed) {
                        other.deactivate();
                    }
                }
            });
        }
    }
}
