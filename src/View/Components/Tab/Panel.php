<?php

namespace WireKit\View\Components\Tab;

use Illuminate\View\Component;
use Illuminate\View\View;

class Panel extends Component
{
    public function __construct(
        public string $name = '',
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.tab.panel');
    }
}
