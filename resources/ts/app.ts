import { initAccordions } from './components/accordion/initAccordions';
import { initContext } from './components/context/initContext';
import { initDropdowns } from './components/dropdown/initDropdowns';
import { initToggles } from './components/toggles/initToggles';
import { initTooltips } from './components/tooltip/initTooltips';
import { initModals } from './components/modal/initModals';

document.addEventListener('DOMContentLoaded', () => {
    initToggles();
    initAccordions();
    initContext();
    initTooltips();
    initDropdowns();
    initModals();
});
