<?php

namespace WireKit\View\Components\Tab;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $name,
        public string $icon = '',
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.tab.index');
    }
}
