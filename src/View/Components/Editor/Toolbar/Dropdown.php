<?php

namespace WireKit\View\Components\Editor\Toolbar;

use Illuminate\View\Component;
use Illuminate\View\View;

class Dropdown extends Component
{
    public function __construct(
        public string  $label = '',
        public ?string $defaultIcon = null,
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.editor.toolbar.dropdown');
    }
}
