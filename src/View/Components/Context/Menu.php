<?php

namespace WireKit\View\Components\Context;

use Illuminate\View\Component;

class Menu extends Component
{
    public string $menuId;

    public function __construct(
    ) {
        $this->menuId = uniqid('menu-');
    }

    public function render()
    {
        return view('wire-kit::components.context.menu');
    }
}
