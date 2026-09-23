import { Input } from './Input';

export class Revealable {
    private _trigger: HTMLButtonElement;
    private _revealed: boolean = false;
    private _hideIcon: HTMLElement;
    private _showIcon: HTMLElement;

    constructor(private _input: Input) {
        this._trigger = this._input.container.querySelector('[data-wire-input-reveal]') as HTMLButtonElement;
        this._hideIcon = this._input.container.querySelector('[data-wire-reveal-hide]') as HTMLElement;
        this._showIcon = this._input.container.querySelector('[data-wire-reveal-show]') as HTMLElement;
        this._trigger.addEventListener('click', this.toggle);
        this.hide();
        this.sync();
    }

    private toggle = () => {
        if (this._revealed) {
            this.hide();
        } else {
            this.show();
        }
    };

    private show = () => {
        this._input.el.type = 'text';
        this._revealed = true;
        this.sync();
    };

    private hide = () => {
        this._input.el.type = 'password';
        this._revealed = false;
        this.sync();
    };

    private sync() {
        this._hideIcon.style.display = this._revealed ? 'block' : 'none';
        this._showIcon.style.display = this._revealed ? 'none' : 'block';
    }
}
