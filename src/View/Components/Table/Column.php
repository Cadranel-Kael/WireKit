<?php

namespace WireKit\View\Components\Table;

use Illuminate\Support\Collection;
use Illuminate\View\Component;
use Illuminate\View\View;
use Str;

class Column extends Component
{
    public function __construct(
        public string $align = 'start',
        public bool $sortable = false,
        public bool $sorted = false,
        public string $direction = 'asc',
    ) {}

    public function alignClass()
    {
        return match ($this->align) {
            'start' => 'text-start',
            'center' => 'text-center',
            'end' => 'text-end',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.table.column');
    }
}
