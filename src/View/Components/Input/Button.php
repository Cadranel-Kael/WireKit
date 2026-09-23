<?php

namespace WireKit\View\Components\Input;

use Illuminate\View\Component;
use Illuminate\View\View;

class Button extends Component
{
    public function __construct(
        public bool $clearable = false,
        public bool $revealable = false,
        public bool $copyable = false,
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.input.button');
    }
}
