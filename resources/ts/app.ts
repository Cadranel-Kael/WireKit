import { initAccordions } from './components/accordion/initAccordions';
import { initContext } from './components/context/initContext';
import { initDropdowns } from './components/dropdown/initDropdowns';
import { initToggles } from './components/toggles/initToggles';
import { initTooltips } from './components/tooltip/initTooltips';
import { initModals } from './components/modal/initModals';
import { initTabList } from './components/tab/initTabList';
import { initInputs } from './components/input/initInputs';

declare global {
    const Livewire: any;
}

document.addEventListener('livewire:init', () => {
    initToggles();
    initAccordions();
    initContext();
    initTooltips();
    initDropdowns();
    initModals();
    initTabList();
    initInputs();
});
