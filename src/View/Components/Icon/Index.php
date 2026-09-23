<?php

namespace WireKit\View\Components\Icon;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $name = '',
        public string $iconSet = 'lucide',
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.icon.index');
    }
}
