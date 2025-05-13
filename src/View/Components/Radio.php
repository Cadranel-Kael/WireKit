<?php

namespace LivewireUIKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Radio extends Component
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
        return view('livewire-ui-kit::components.radio');
    }
}
