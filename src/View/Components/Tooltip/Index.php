<?php

namespace WireKit\View\Components\Tooltip;

use Illuminate\Support\Collection;
use Illuminate\View\Component;
use Illuminate\View\View;
use Str;

class Index extends Component
{
    public string $tooltipDirective;

    public function __construct(
        public string $content = '',
        public bool $toggleable = false,
        public string $position = 'top',
    ) {
        $this->createTooltipDirective();
    }

    public function createTooltipDirective()
    {
        if ($this->toggleable) {
            $this->tooltipDirective = "x-tooltip.on.click.placement.{ $this->position }='tooltip'";
        }
        $this->tooltipDirective = "x-tooltip.placement.{ $this->position }='tooltip'";
    }

    public function render(): View
    {
        return view('wire-kit::components.tooltip.index');
    }
}
