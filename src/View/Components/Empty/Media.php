<?php

namespace WireKit\View\Components\Empty;

use Illuminate\View\Component;
use Illuminate\View\View;

class Media extends Component
{
    public function __construct()
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.empty.media');
    }
}
