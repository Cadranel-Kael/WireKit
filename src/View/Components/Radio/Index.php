<?php

namespace WireKit\View\Components\Radio;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $id;

    public function __construct(
        public string $label = '',
        public bool $required = false,
    ) {
        $this->id = uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.radio.index');
    }
}
