<?php

namespace WireKit\View\Components\Sidebar;

use Illuminate\View\Component;

class Content extends Component
{
    public function __construct()
    {
    }

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.sidebar.content');
    }
}
