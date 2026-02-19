<?php

namespace WireKit\View\Components\Dropdown;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $triggerId;

    public string $menuId;

    public function __construct(
    )
    {
        $this->triggerId = uniqid('trigger-');
        $this->menuId = uniqid('menu-');
    }

    public function render(): View
    {
        return view('wire-kit::components.dropdown.index');
    }
}
