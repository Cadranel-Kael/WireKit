<?php

namespace WireKit\View\Components\Accordion;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public bool $exclusive = false,
        public bool $transition = false,
    ) {}

    public function render(): View
    {
        return view('livewire-ui-kit::components.accordion.index');
    }
}
