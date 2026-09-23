import { computePosition, Placement, flip, shift, offset, OffsetOptions } from '@floating-ui/dom';

export class Tooltip {
    private _trigger: HTMLElement | null;
    private _tooltip: HTMLElement | null;
    private _placement: Placement | undefined;
    private _offset: OffsetOptions = 0;

    constructor(private _el: HTMLElement) {
        this._trigger = _el.querySelector<HTMLElement>('[data-wire-tooltip-trigger]');
        this._tooltip = _el.querySelector<HTMLElement>('[data-wire-tooltip-content]');

        if (!this._tooltip || !this._trigger) return;

        this._placement = _el.dataset.wirePlacement as Placement;
        this._offset = Number(_el.dataset.wireOffset ?? 0);

        this._update();

        [
            ['mouseenter', this._showTooltip] as const,
            ['mouseleave', this._hideTooltip] as const,
            ['focus', this._showTooltip] as const,
            ['blur', this._hideTooltip] as const,
        ].forEach(([event, listener]) => {
            this._trigger!.addEventListener(event, listener);
        });
    }

    private _update() {
        computePosition(this._trigger!, this._tooltip!, {
            placement: this._placement,
            middleware: [offset(this._offset), flip(), shift()],
        }).then(({ x, y }) => {
            Object.assign(this._tooltip!.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }

    private _showTooltip = () => {
        this._tooltip!.style.display = 'block';
        this._update();
    };

    private _hideTooltip = () => {
        this._tooltip!.style.display = '';
    };
}
