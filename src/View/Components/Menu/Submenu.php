<?php

namespace WireKit\View\Components\Menu;

use Illuminate\View\Component;
use Illuminate\View\View;

class Submenu extends Component
{
    public string $id;

    public function __construct(
        public string $heading = '',
        public string $placement = 'right-start',
    )
    {
        $this->id = uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.menu.submenu');
    }
}
