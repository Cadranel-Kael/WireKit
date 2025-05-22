<?php

namespace WireKit\View\Components\Button;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public function __construct(
    ) {}


    public function render(): View
    {
        return view('wire-kit::components.button.group');
    }
}
