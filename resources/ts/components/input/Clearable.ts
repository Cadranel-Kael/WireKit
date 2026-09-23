import { Input } from './Input';

export class Clearable {
    private _trigger: HTMLButtonElement;

    constructor(private _input: Input) {
        this._trigger = this._input.container.querySelector('[data-wire-input-clear]') as HTMLButtonElement;
        this.toggleVisibility();
        this._input.el.addEventListener('input', this.toggleVisibility);
        this._trigger.addEventListener('click', this.clear);
    }

    private toggleVisibility = () => {
        if (this._input.value.length > 0) {
            this._trigger.style.display = 'block';
        } else {
            this._trigger.style.display = 'none';
        }
    };

    private clear = () => {
        this._input.value = '';
        this._input.focus();
        this.toggleVisibility();
    };
}
