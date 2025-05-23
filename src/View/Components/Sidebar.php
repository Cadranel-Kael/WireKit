<?php

namespace WireKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Sidebar extends Component
{
    public function __construct(
        public bool $appTitle = false,
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.sidebar');
    }
}
