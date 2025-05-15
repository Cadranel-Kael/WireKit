<?php

namespace WireKit\View\Components\Accordion;

use Illuminate\View\Component;
use Illuminate\View\View;

class Heading extends Component
{
    public function __construct(
    ) {}

    public function render(): View
    {
        return view('livewire-ui-kit::components.accordion.heading');
    }
}
