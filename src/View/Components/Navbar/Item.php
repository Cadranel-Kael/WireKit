<?php

namespace WireKit\View\Components\Navbar;

use Illuminate\View\Component;

class Item extends Component
{
    public function __construct(
        public string $href = '#',
        public bool $current = false,
    ) {
        if (! $current) {
            if (str_contains(url()->current(), $this->href)) {
                $this->current = true;
            }
        }
    }

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.navbar.item');
    }
}
