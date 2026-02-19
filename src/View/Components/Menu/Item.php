<?php

namespace WireKit\View\Components\Menu;

use Illuminate\View\Component;
use Illuminate\View\View;

class Item extends Component
{
    public function __construct(
        public string $icon = '',
        public string $id = '',
        public string $shortcut = '',
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.menu.item');
    }
}
