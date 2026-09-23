<?php

namespace WireKit\View\Components\Fieldset;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $variant = '',
        public string $legend = '',
        public bool   $collapsible = false,
        public bool   $expanded = true,
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.fieldset.index');
    }
}
