<?php

namespace WireKit\View\Components\Editor\Toolbar;

use Illuminate\View\Component;
use Illuminate\View\View;

class Headings extends Component
{
    public function __construct(
        public array $headings = [1, 2, 3],
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.editor.toolbar.headings');
    }
}
