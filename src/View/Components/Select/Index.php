<?php

namespace WireKit\View\Components\Select;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $id;

    public function __construct(
        public string $label = '',
        ?string       $id = null,
    )
    {
        $this->id = $id ?? uniqid('select-');
    }

    public function render(): View
    {
        return view('wire-kit::components.select.index');
    }
}
