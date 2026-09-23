<?php

namespace WireKit\View\Components\Table;

use Illuminate\View\Component;
use Illuminate\View\View;

class Cell extends Component
{
    public function __construct(
        public string $align = 'start',
    )
    {
    }

    public function alignClass()
    {
        return match ($this->align) {
            'start' => 'text-start justify-start',
            'center' => 'text-center justify-center',
            'end' => 'text-end justify-end',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.table.cell');
    }
}
