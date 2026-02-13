import { initAccordions } from './components/accordion/initAccordions';
import { initContext } from './components/context/initContext';
import { initMenu } from './components/menu/initMenus';
import { initToggles } from './components/toggles/initToggles';
import { initTooltips } from './components/tooltip/initTooltips';

document.addEventListener('DOMContentLoaded', () => {
    initToggles();
    initAccordions();
    initMenu();
    initContext();
    initTooltips();
});
