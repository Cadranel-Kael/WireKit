<?php

namespace WireKit\View\Components\Autocomplete;

use Illuminate\View\Component;

class Index extends Component
{
    public function __construct(
    ) {}

    public function render()
    {
        return view('wire-kit::components.autocomplete.index');
    }
}
