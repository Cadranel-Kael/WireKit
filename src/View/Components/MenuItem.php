<?php

namespace LivewireUIKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class MenuItem extends Component
{
    public function __construct(
        public string $link = '#',
        public string $icon = '',
    )
    {
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.menu-item');
    }
}
