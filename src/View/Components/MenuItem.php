<?php

namespace WireKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class MenuItem extends Component
{
    public function __construct(
        public string $link = '#',
        public string $icon = '',
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.menu-item');
    }
}
