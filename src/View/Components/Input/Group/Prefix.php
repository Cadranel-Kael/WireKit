<?php

namespace WireKit\View\Components\Input\Group;

use Illuminate\View\Component;
use Illuminate\View\View;

class Prefix extends Component
{
    public function __construct() {}

    public function render(): View
    {
        return view('wire-kit::components.input.group.prefix');
    }
}
