<?php

namespace WireKit\View\Components\Radio;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public function __construct(
        public string $label = '',
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.radio.group');
    }
}
