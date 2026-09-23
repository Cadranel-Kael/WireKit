<?php

namespace WireKit\View\Components\Input;

use Illuminate\View\Component;
use Illuminate\View\View;

class Input extends Component
{
    public function __construct(
        public ?string $icon = null,
        public ?string $leftIcon = null,
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.input.input');
    }
}
