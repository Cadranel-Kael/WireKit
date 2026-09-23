<?php

namespace WireKit\View\Components\Tooltip;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $id;

    public function __construct(
        public string $content = '',
        public string $offset = '4',
        public string $placement = 'bottom',
    )
    {
        $this->id = uniqid('tooltip-');
    }

    public function render(): View
    {
        return view('wire-kit::components.tooltip.index');
    }
}
