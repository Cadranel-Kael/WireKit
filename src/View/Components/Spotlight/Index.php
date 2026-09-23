<?php

namespace WireKit\View\Components\Spotlight;

use Illuminate\View\Component;

class Index extends Component
{
    public function __construct(
        public string $button = 'Search',
        public bool $icon = true,
        public string $placeholder = 'Search...',
    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.spotlight.index');
    }
}
