<?php

namespace WireKit\View\Components\Tooltip;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $tooltip;

    public function __construct(
        public ?string $delay,
        public string $content = '',
        public string $placement = 'top',
        public bool $arrowless = false,
    ) {
        $this->tooltip = uniqid('tooltip-');
    }

    public function getPlacementClass()
    {
        return match ($this->placement) {
            'top' => 'bottom-full pb-2 left-1/2 -translate-x-1/2',
            'right' => 'top-1/2 left-full pl-2 -translate-y-1/2',
            'left' => 'top-1/2 right-full pr-2 -translate-y-1/2',
            'bottom' => 'top-full pt-2 left-1/2 -translate-x-1/2',
        };
    }

    public function getArrowPlacementClass()
    {
        return match ($this->placement) {
            'top' => 'left-1/2 top-full -translate-x-1/2 border-t-inherit',
            'right' => 'top-1/2 right-full -translate-y-1/2 border-r-inherit',
            'left' => 'top-1/2 left-full -translate-y-1/2 border-l-inherit',
            'bottom' => 'left-1/2 bottom-full -translate-x-1/2 border-b-inherit',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.tooltip.index');
    }
}
