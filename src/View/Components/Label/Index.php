<?php

namespace WireKit\View\Components\Label;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $as = 'label',
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.label.index');
    }
}
