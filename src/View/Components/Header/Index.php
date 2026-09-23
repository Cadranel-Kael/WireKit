<?php

namespace WireKit\View\Components\Header;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct() {}

    public function render(): View
    {
        return view('wire-kit::components.header.index');
    }
}
