<?php

namespace WireKit\View\Components\Sidebar;

use Illuminate\View\Component;

class Header extends Component
{
    public function __construct(
    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.sidebar.header');
    }
}
