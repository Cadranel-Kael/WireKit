<?php

namespace WireKit\View\Components\Editor;

use Illuminate\View\Component;
use Illuminate\View\View;

class Button extends Component
{
    public function __construct(
        public string $icon = '',
        public string $label = '',
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.editor.button');
    }
}
