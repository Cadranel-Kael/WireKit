<?php

namespace WireKit\View\Components\Editor\Toolbar;

use Illuminate\View\Component;
use Illuminate\View\View;

class Full extends Component
{
    public function __construct(
        public array $headings = [2, 3],
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.editor.toolbar.full');
    }
}
