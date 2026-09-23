<?php

namespace WireKit\View\Components\Sidebar;

use Illuminate\View\Component;

class Search extends Component
{
    public function __construct(
    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.sidebar.search');
    }
}
