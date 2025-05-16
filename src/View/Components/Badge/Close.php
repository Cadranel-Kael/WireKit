<?php

namespace WireKit\View\Components\Badge;

use Illuminate\View\Component;
use Illuminate\View\View;

class Close extends Component
{
    public function __construct(
    ) {}

    public function render(): View
    {
        return view('livewire-ui-kit::components.badge.close');
    }
}
