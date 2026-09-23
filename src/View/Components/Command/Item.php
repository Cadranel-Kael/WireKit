<?php

namespace WireKit\View\Components\Command;

use Illuminate\View\Component;
use Illuminate\View\View;

class Item extends Component
{
    public function __construct(
        public string $icon = '',
        public string $kbd = '',
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.command.item');
    }
}
