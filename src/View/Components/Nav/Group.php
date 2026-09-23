<?php

namespace WireKit\View\Components\Nav;

use Illuminate\View\Component;

class Group extends Component
{
    public function __construct(
        public string $heading = '',
        public bool $collapsible = false,
        public bool $collapsed = true,
    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.nav.group');
    }
}
