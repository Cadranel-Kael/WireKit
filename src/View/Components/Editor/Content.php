<?php

namespace WireKit\View\Components\Editor;

use Illuminate\View\Component;
use Illuminate\View\View;

class Content extends Component
{
    public function __construct()
    {
    }


    public function render(): View
    {
        return view('wire-kit::components.editor.content');
    }
}
