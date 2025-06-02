<?php

namespace WireKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Context extends Component
{

    public function __construct(
    ) {
    }

    public function render(): View
    {
        return view('wire-kit::components.context');
    }
}
