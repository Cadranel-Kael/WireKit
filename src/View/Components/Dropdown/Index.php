<?php

namespace WireKit\View\Components\Dropdown;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $buttonId;

    public string $menuId;

    public function __construct()
    {
        $this->buttonId = 'button-'.uniqid();
        $this->menuId = 'menu-'.uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.dropdown.index');
    }
}
