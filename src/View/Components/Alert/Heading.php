<?php

namespace WireKit\View\Components\Alert;

use Illuminate\View\Component;
use Illuminate\View\View;

class Heading extends Component
{
    public function __construct(
        public string $icon = ''
    ) {}

    public function render(): View
    {
        return view('livewire-ui-kit::components.alert.heading');
    }
}
