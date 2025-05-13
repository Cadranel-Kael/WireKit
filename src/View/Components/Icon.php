<?php

namespace WireKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Icon extends Component
{
    public function __construct(
        public string $name = '',
        public string $iconSet = 'heroicon'
    )
    {
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.icon');
    }
}
