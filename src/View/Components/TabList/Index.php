<?php

namespace WireKit\View\Components\TabList;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $variant = '',
    )
    {
    }

    public function getVariantClasses()
    {
        return match ($this->variant) {
            'line' => '',
            default => 'bg-muted rounded-auto-md',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.tablist.index');
    }
}
