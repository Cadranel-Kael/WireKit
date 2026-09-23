// Factory
export function initComboboxes(root: ParentNode = document) {
    const nodes = root.querySelectorAll<HTMLElement>('[data-wire-combobox]');
    return Array.from(nodes).map((node) => new Combobox(node));
}

// Helpers
function getVisibleOptions(list: HTMLElement): HTMLElement[] {
    return Array.from(list.querySelectorAll('[data-wire-option]')).filter((option) => {
        const el = option as HTMLElement;
        const style = getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
    }) as HTMLElement[];
}

// Class
class Combobox {
    private combobox: HTMLElement;
    private list: HTMLElement;
    private options: NodeListOf<Element>;
    private searchInput: HTMLInputElement;
    private dataSelector: string;
    private opened: boolean;
    private currentOption: string | null;
    private currentFocused: Element | null;
    private noResult: HTMLElement;

    constructor(combobox: HTMLElement) {
        this.combobox = combobox;
        this.list = combobox.querySelector('[data-wire-combobox--list]') as HTMLElement;
        this.dataSelector = '[data-wire-option]';
        this.options = this.list.querySelectorAll(this.dataSelector);
        this.searchInput = combobox.querySelector('[data-wire-combobox--input]') as HTMLInputElement;
        this.noResult = combobox.querySelector('[data-wire-combobox--no-results]') as HTMLElement;
        this.hideList();
        this.opened = false;
        this.currentOption = null;
        this.currentFocused = null;

        this.addEventListeners();
    }

    private addEventListeners() {
        this.searchInput.addEventListener('input', this.handleInput.bind(this));
        this.searchInput.addEventListener('click', this.handleClick.bind(this));
        this.searchInput.addEventListener('keydown', this.handleKeys.bind(this));
        document.addEventListener('click', this.handleClickAway.bind(this));
        this.getAllOptions().forEach((option) => {
            option.addEventListener('mouseenter', this.handleOptionMouseEnter.bind(this));
            option.addEventListener('mouseleave', this.handleOptionMouseLeave.bind(this));
            option.addEventListener('click', this.handleOptionClick.bind(this));
        });
    }

    private getAllOptions(): HTMLElement[] {
        return Array.from(this.list.querySelectorAll(this.dataSelector)) as HTMLElement[];
    }

    private handleOptionClick() {
        this.selectCurrentOption();
    }

    private focusOption(el: HTMLElement) {
        this.getAllOptions().forEach((o) => o.removeAttribute('data-focused'));
        el.setAttribute('data-focused', '');
        this.currentFocused = el;
    }

    private handleKeys(e: KeyboardEvent) {
        if (e.key === 'ArrowDown') this.moveFocus(1);
        if (e.key === 'ArrowUp') this.moveFocus(-1);
        if (e.key === 'Enter') this.handleEnter();
        if (e.key === 'Escape') this.handleEscape();
    }

    private handleEscape() {
        if (!this.currentOption) {
            this.searchInput.value = '';
        }
        this.searchInput.blur();
        this.hideList();
    }

    private resetFocus() {
        this.options.forEach((option) => {
            option.removeAttribute('data-focused');
        });
        this.currentFocused = null;
        if (getVisibleOptions(this.list).length > 0) {
            const firstOption = getVisibleOptions(this.list)[0];
            firstOption.setAttribute('data-focused', '');
            this.currentFocused = firstOption;
        }
    }

    private handleEnter() {
        this.selectCurrentOption();
    }

    private moveFocus(delta: 1 | -1) {
        const visible = getVisibleOptions(this.list);
        if (!visible.length) return;

        if (!this.currentFocused) {
            this.currentFocused = visible[0];
        } else {
            const idx = visible.indexOf(this.currentFocused as HTMLElement);
            const next = visible[(idx + delta + visible.length) % visible.length];
            this.currentFocused.removeAttribute('data-focused');
            this.currentFocused = next;
        }

        this.currentFocused.setAttribute('data-focused', '');
    }

    private handleOptionMouseEnter(e: Event) {
        this.focusOption(e.currentTarget as HTMLElement);
    }

    private handleOptionMouseLeave(e: Event) {
        const el = e.currentTarget as HTMLElement;
        el.removeAttribute('data-focused');
        this.currentFocused = null;
    }

    private showList() {
        this.list.style.display = '';
        this.opened = true;
    }

    private hideList() {
        this.list.style.display = 'none';
        this.opened = false;
    }

    private handleInput() {
        this.search();
        this.showList();
        this.resetFocus();
        this.handleNoResults();
    }

    private selectCurrentOption() {
        if (!this.currentFocused) return;

        this.currentOption = this.currentFocused.textContent?.trim() ?? '';
        this.searchInput.value = this.currentOption;
        this.hideList();
        this.searchInput.blur();
    }

    private handleNoResults() {
        this.noResult.style.display = this.hasResults() ? 'none' : '';
    }

    private hasResults() {
        return getVisibleOptions(this.list).length > 0;
    }

    private handleClick() {
        if (!this.opened) {
            this.resetFocus();
        }
        this.search();
        this.showList();
        this.handleNoResults();
        this.searchInput.select();
    }

    private handleClickAway(e: MouseEvent) {
        if (!this.combobox.contains(e.target as HTMLElement)) {
            this.hideList();
        }
    }

    private search() {
        const term = this.searchInput.value.toLowerCase().trim();

        this.options.forEach((option) => {
            const text = option.textContent?.toLowerCase() ?? '';

            const matches = text.includes(term);

            (option as HTMLElement).style.display = matches ? '' : 'none';
        });
    }
}

// Executables
document.addEventListener('DOMContentLoaded', () => {
    initComboboxes();
});
