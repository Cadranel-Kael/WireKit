<?php

namespace WireKit\View\Components\Menu;

use Illuminate\View\Component;
use Illuminate\View\View;

class RadioItem extends Component
{
    public function __construct(
        public bool $active = false,
        public string $shortcut = '',
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.menu.radio-item');
    }
}
