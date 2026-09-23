<?php

namespace WireKit\View\Components\Select;

use Illuminate\View\Component;
use Illuminate\View\View;

class Option extends Component
{
    public $id;

    public function __construct(
        public string $value = '',
        public bool $selected = false,
    ) {
        $this->id = uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.select.option');
    }
}
