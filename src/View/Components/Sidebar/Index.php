<?php

namespace WireKit\View\Components\Sidebar;

use Illuminate\View\Component;

class Index extends Component
{
    public function __construct(
        public bool $sticky = false,
    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.sidebar.index');
    }
}
