<?php

namespace WireKit\View\Components\Autocomplete;

use Illuminate\View\Component;

class Item extends Component
{
    public function __construct(
    ) {}

    public function render()
    {
        return view('wire-kit::components.autocomplete.item');
    }
}
