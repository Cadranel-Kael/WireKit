interface ComboConfig {
    combobox: HTMLElement;
    list: HTMLElement;
    searchInput: HTMLInputElement;
    dataSelector: string;
    noResult: HTMLElement;
}

export class Combobox {
    private _combobox: HTMLElement;
    private _list: HTMLElement;
    private _options: NodeListOf<Element>;
    private _searchInput: HTMLInputElement;
    private _dataSelector: string;
    private _opened: boolean;
    private _currentOption: string | null = null;
    private _currentFocused: HTMLElement | null = null;
    private _noResult: HTMLElement;

    constructor(ComboConfig: ComboConfig) {
        this._combobox = ComboConfig.combobox;
        this._list = ComboConfig.list;
        this._options = this._list.querySelectorAll(ComboConfig.dataSelector);
        this._dataSelector = ComboConfig.dataSelector;
        this._searchInput = ComboConfig.searchInput;
        this._noResult = ComboConfig.noResult;
        this.hideList();
        this._opened = false;

        this.addEventListeners();
    }

    private addEventListeners() {
        this._searchInput.addEventListener('input', this.handleInput.bind(this));
        this._searchInput.addEventListener('click', this.handleClick.bind(this));
        this._searchInput.addEventListener('keydown', this.handleKeys.bind(this));
        document.addEventListener('click', this.handleClickAway.bind(this));
        this.getAllOptions().forEach((option) => {
            option.addEventListener('mouseenter', this.handleOptionMouseEnter.bind(this));
            option.addEventListener('mouseleave', this.handleOptionMouseLeave.bind(this));
            option.addEventListener('click', this.handleOptionClick.bind(this));
        });
    }

    private getAllOptions(): HTMLElement[] {
        return Array.from(this._list.querySelectorAll(this._dataSelector)) as HTMLElement[];
    }

    private handleOptionClick() {
        this.selectCurrentOption();
    }

    private handleKeys(e: KeyboardEvent) {
        if (e.key === 'ArrowDown') this.moveFocus(1);
        if (e.key === 'ArrowUp') this.moveFocus(-1);
        if (e.key === 'Enter') this.handleEnter();
        if (e.key === 'Escape') this.handleEscape();
    }

    private handleEscape() {
        if (!this._currentOption) {
            this._searchInput.value = '';
        }
        this._searchInput.blur();
        this.hideList();
    }

    private resetFocus() {
        this._options.forEach((option) => {
            option.removeAttribute('data-focused');
        });
        this._currentFocused = null;
        if (this.getVisibleOptions().length > 0) {
            const firstOption = this.getVisibleOptions()[0];
            firstOption.setAttribute('data-focused', '');
            this._currentFocused = firstOption;
        }
    }

    private handleEnter() {
        this.selectCurrentOption();
    }

    private moveFocus(delta: 1 | -1) {
        const visible = this.getVisibleOptions();
        if (!visible.length) return;

        if (!this._currentFocused) {
            this._currentFocused = visible[0];
        } else {
            const idx = visible.indexOf(this._currentFocused as HTMLElement);
            const next = visible[(idx + delta + visible.length) % visible.length];
            this._currentFocused.removeAttribute('data-focused');
            this._currentFocused = next;
        }

        this._currentFocused.setAttribute('data-focused', '');
    }

    private getVisibleOptions(): HTMLElement[] {
        return Array.from(this._list.querySelectorAll('[data-select-option]'))
            .filter((option) => {
                const el = option as HTMLElement;
                const style = getComputedStyle(el);
                return style.display !== 'none' && style.visibility !== 'hidden';
            })
            .map((option) => option as HTMLElement);
    }

    private handleOptionMouseEnter(e: Event) {
        this._options.forEach((option) => {
            option.removeAttribute('data-focused');
        });
        const el = e.currentTarget as HTMLElement;
        el.setAttribute('data-focused', '');
        this._currentFocused = el;
    }

    private handleOptionMouseLeave(e: Event) {
        const el = e.currentTarget as HTMLElement;
        el.removeAttribute('data-focused');
        this._currentFocused = null;
    }

    private showList() {
        this._list.style.display = '';
        this._opened = true;
    }

    private hideList() {
        this._list.style.display = 'none';
        this._opened = false;
    }

    private handleInput() {
        this.search();
        this.showList();
        this.resetFocus();
        this.handleNoResults();
    }

    private selectCurrentOption() {
        if (!this._currentFocused) return;

        this._currentOption = this._currentFocused.textContent?.trim() ?? '';
        this._searchInput.value = this._currentOption;
        this.hideList();
        this._searchInput.blur();
    }

    private handleNoResults() {
        this._noResult.style.display = this.hasResults() ? 'none' : '';
    }

    private hasResults() {
        return this.getVisibleOptions().length > 0;
    }

    private handleClick() {
        if (!this._opened) {
            this.resetFocus();
        }
        this.search();
        this.showList();
        this.handleNoResults();
        this._searchInput.select();
    }

    private handleClickAway(e: MouseEvent) {
        if (!this._combobox.contains(e.target as HTMLElement)) {
            this.hideList();
        }
    }

    private search() {
        const term = this._searchInput.value.toLowerCase().trim();

        this._options.forEach((option) => {
            const text = option.textContent?.toLowerCase() ?? '';

            const matches = text.includes(term);

            (option as HTMLElement).style.display = matches ? '' : 'none';
        });
    }
}
