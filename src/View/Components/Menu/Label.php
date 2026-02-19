<?php

namespace WireKit\View\Components\Menu;

use Illuminate\View\Component;
use Illuminate\View\View;

class Label extends Component
{
    public string $id;

    public function __construct(
        public string $icon = '',
    ) {
        $this->id = 'item-'.uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.menu.label');
    }
}
