<?php

namespace WireKit\View\Components\Sidebar;

use Illuminate\View\Component;

class Brand extends Component
{
    public function __construct(
        public string $href = '#',
        public string $logo = '',
        public string $name = ''
    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.sidebar.brand');
    }
}
