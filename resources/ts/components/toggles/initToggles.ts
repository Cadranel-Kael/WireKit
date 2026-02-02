import { Toggle } from './Toggle';
import { ToggleGroup } from './ToggleGroup';

export function initToggles(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLButtonElement>('[data-wire-toggle]');
    const toggles = Array.from(nodes).map((node) => new Toggle(node));

    const groups = new Map<string, Toggle[]>();

    for (const toggle of toggles) {
        const group = toggle['el'].dataset.wireGroup;
        if (!group) continue;
        groups.set(group, [...(groups.get(group) ?? []), toggle]);
    }

    for (const [_, groupToggles] of groups) {
        const exclusive = groupToggles[0].isExlcusive;
        new ToggleGroup(groupToggles, exclusive);
    }

    return toggles;
}
