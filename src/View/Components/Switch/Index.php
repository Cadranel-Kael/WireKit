<?php

namespace WireKit\View\Components\Switch;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $label = '',
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.switch.index');
    }
}
