<?php

namespace WireKit\View\Components\Menu;

use Illuminate\View\Component;
use Illuminate\View\View;

class Separator extends Component
{

    public function __construct(
    ) {
    }

    public function render(): View
    {
        return view('wire-kit::components.menu.index');
    }
}
