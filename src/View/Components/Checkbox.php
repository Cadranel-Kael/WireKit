<?php

namespace WireKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Checkbox extends Component
{
    public function __construct(
        public string $label = '',
        public string $value = '',
        public bool $labelSrOnly = false,
    )
    {
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.checkbox');
    }
}
