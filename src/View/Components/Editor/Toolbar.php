<?php

namespace WireKit\View\Components\Editor;

use Illuminate\View\Component;
use Illuminate\View\View;

class Toolbar extends Component
{
    public function __construct()
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.editor.toolbar');
    }
}
