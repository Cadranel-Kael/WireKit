<?php

namespace WireKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Tooltip extends Component
{
    public string $id;
    public function __construct(
        public string $label = '',
        public string $content = '',
        public bool $toggleable = false,
    ) {
        $this->id = uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.tooltip');
    }
}
