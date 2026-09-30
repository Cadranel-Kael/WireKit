<?php

namespace WireKit\View\Components\Empty;

use Illuminate\View\Component;
use Illuminate\View\View;

class Icon extends Component
{
    public function __construct(
        public string $name,
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.empty.icon');
    }
}
