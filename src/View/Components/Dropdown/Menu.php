<?php

namespace WireKit\View\Components\Dropdown;

use Illuminate\View\Component;
use Illuminate\View\View;

class Menu extends Component
{
    public function __construct()
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.dropdown.menu');
    }
}
