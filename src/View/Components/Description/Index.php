<?php

namespace WireKit\View\Components\Description;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $position = 'before',
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.description.index');
    }
}
