<?php

namespace WireKit\View\Components\Editor\Toolbar;

use Illuminate\View\Component;
use Illuminate\View\View;

class Codeblock extends Component
{
    public function __construct()
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.editor.toolbar.codeblock');
    }
}
