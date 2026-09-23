import { Input } from './Input';

export class Copyable {
    private _trigger: HTMLButtonElement;
    private _copyIcon: HTMLElement;
    private _successIcon: HTMLElement;

    constructor(private _input: Input) {
        this._trigger = this._input.container.querySelector('[data-wire-input-copy]') as HTMLButtonElement;
        this._copyIcon = this._input.container.querySelector('[data-wire-input-copy-icon]') as HTMLElement;
        this._successIcon = this._input.container.querySelector('[data-wire-input-copy-success]') as HTMLElement;
        this._successIcon.style.display = 'none';
        this._trigger.addEventListener('click', this.copy.bind(this));
    }

    private async copy() {
        const type = 'text/plain';
        const clipboardItemData = {
            [type]: this._input.value,
        };
        const clipboardItem = new ClipboardItem(clipboardItemData);
        await navigator.clipboard
            .write([clipboardItem])
            .then(this.showSuccess)
            .catch((err) => console.error('Failed:', err));
    }

    private showSuccess = () => {
        this._copyIcon.style.display = 'none';
        this._successIcon.style.display = 'block';
        setTimeout(() => {
            this._copyIcon.style.display = 'block';
            this._successIcon.style.display = 'none';
        }, 2000);
    };
}
