import { Combobox } from './Classes/Combobox';
import { initAccordions } from './components/accordion/initAccordions';
import { initContext } from './components/context/initContext';
import { initMenu } from './components/menu/initMenus';
import { initToggles } from './components/toggles/initToggles';

document.addEventListener('DOMContentLoaded', () => {
    initToggles();
    initAccordions();
    initMenu();
    initContext();
});

// const comboboxes = document.querySelectorAll('[data-wire-select]');

// comboboxes.forEach((combobox) => {
//     new Combobox({
//         combobox: combobox as HTMLElement,
//         list: combobox.querySelector('[data-wire-select-list]') as HTMLElement,
//         searchInput: combobox.querySelector('[data-wire-select-input]') as HTMLInputElement,
//         dataSelector: '[data-select-option]',
//         noResult: combobox.querySelector('[data-wire-select-no-results]') as HTMLElement,
//     });
// });
