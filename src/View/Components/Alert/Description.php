<?php

namespace WireKit\View\Components\Alert;

use Illuminate\View\Component;
use Illuminate\View\View;

class Description extends Component
{
    public function __construct(
    ) {}

    public function render(): View
    {
        return view('livewire-ui-kit::components.alert.description');
    }
}
