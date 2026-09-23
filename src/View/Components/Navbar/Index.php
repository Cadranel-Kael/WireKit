<?php

namespace WireKit\View\Components\Navbar;

use Illuminate\View\Component;

class Index extends Component
{
    public function __construct(
        public bool $appTitle = false,
    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.navbar.index');
    }
}
