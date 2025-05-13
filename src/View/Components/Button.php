<?php

namespace WireKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Button extends Component
{
    public function __construct(
        public string $link = '',
        public string $type = 'button',
        public ?string $label = '',
        public bool $loading = false,
    ) {}

    public function render(): View
    {
        return view('livewire-ui-kit::components.button');
    }
}
