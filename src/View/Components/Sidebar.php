<?php

namespace LivewireUIKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Sidebar extends Component
{
    public function __construct(
        public bool $appTitle = false,
    )
    {
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.sidebar');
    }
}
