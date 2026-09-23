<?php

namespace WireKit\View\Components\Code;

use Illuminate\View\Component;
use Illuminate\View\View;

class Inline extends Component
{
    public function __construct() {}

    public function render(): View
    {
        return view('wire-kit::components.code.inline');
    }
}
