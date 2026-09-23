<?php

namespace WireKit\View\Components\Resizable;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $orientation = 'horizontal',
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.resizable.index');
    }
}
