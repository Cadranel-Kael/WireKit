<?php

namespace WireKit\View\Components\Modal;

use Illuminate\View\Component;

class Trigger extends Component
{
    public function __construct(
        public string $name = ''
    )
    {
    }

    public function render()
    {
        return view('wire-kit::components.modal.trigger');
    }
}
