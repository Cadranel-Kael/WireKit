<?php

namespace WireKit\View\Components\Nav;

use Illuminate\View\Component;

class Index extends Component
{
    public function __construct(

    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.nav.index');
    }
}
