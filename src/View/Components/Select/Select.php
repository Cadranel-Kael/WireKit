<?php

namespace WireKit\View\Components\Select;

use Illuminate\View\Component;
use Illuminate\View\View;

class Select extends Component
{
    public function __construct()
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.select.select');
    }
}
