interface SearchConfig {
    list: HTMLElement;
    searchInput: HTMLInputElement;
    dataSelector: string;
}

export class Search {
    private _list: HTMLElement;
    private _data: NodeListOf<Element>;
    private _searchInput: HTMLInputElement;

    constructor(SearchConfig: SearchConfig) {
        this._list = SearchConfig.list;
        this._data = this._list.querySelectorAll(SearchConfig.dataSelector);
        this._searchInput = SearchConfig.searchInput;

        this.addEventListeners();
    }

    private addEventListeners() {
        this._searchInput.addEventListener('input', this.search);
    }

    private search = () => {
        const term = this._searchInput.value.toLowerCase().trim();

        this._data.forEach((item) => {
            const text = item.textContent?.toLowerCase() ?? '';

            const matches = text.includes(term);

            (item as HTMLElement).style.display = matches ? '' : 'none';
        });
    };
}
