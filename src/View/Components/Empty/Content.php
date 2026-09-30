<?php

namespace WireKit\View\Components\Empty;

use Illuminate\View\Component;
use Illuminate\View\View;

class Content extends Component
{
    public function __construct()
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.empty.content');
    }
}
