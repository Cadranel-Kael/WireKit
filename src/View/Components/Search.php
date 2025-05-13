<?php

namespace LivewireUIKit\View\Components;

use Illuminate\View\Component;

class Search extends Component
{
    public function __construct(
        public string $placeholder = 'Search',
    )
    {
    }

    public function render()
    {
        return view('livewire-ui-kit::components.search');
    }
}
