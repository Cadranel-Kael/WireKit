<?php

namespace WireKit\View\Components\Fieldset;

use Illuminate\View\Component;
use Illuminate\View\View;

class Row extends Component
{
    public function __construct() {}

    public function render(): View
    {
        return view('wire-kit::components.fieldset.row');
    }
}
