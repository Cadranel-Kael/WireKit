import { Clearable } from './Clearable';
import { Revealable } from './Revealable';
import { Copyable } from './Copyable';

export class Input {
    private _input: HTMLInputElement;
    private _container: HTMLElement;
    private readonly _feature?: 'clearable' | 'copyable' | 'revealable';

    constructor(container: HTMLElement) {
        this._container = container;
        this._input = this._container.querySelector('[data-wire-input]') as HTMLInputElement;
        this._feature = this._container.dataset.wireFeature as 'clearable' | 'copyable' | 'revealable' | undefined;
        if (this._feature === 'clearable') {
            new Clearable(this);
        } else if (this._feature === 'revealable') {
            new Revealable(this);
        } else if (this._feature === 'copyable') {
            new Copyable(this);
        }
    }

    focus() {
        this._input.focus();
    }

    get value() {
        return this._input.value;
    }

    set value(value: string) {
        this._input.value = value;
    }

    get el() {
        return this._input;
    }

    get container() {
        return this._container;
    }
}
