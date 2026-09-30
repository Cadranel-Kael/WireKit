<?php

namespace WireKit\View\Components\Empty;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $icon = '',
        public string $title = '',
        public string $description = '',
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.empty.index');
    }
}
