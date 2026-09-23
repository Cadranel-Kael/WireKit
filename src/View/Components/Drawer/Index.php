<?php

namespace WireKit\View\Components\Drawer;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public ?string $id = null,
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.drawer.index');
    }
}
