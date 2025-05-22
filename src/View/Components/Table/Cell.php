<?php

namespace WireKit\View\Components\Table;

use Illuminate\Support\Collection;
use Illuminate\View\Component;
use Illuminate\View\View;
use Str;

class Cell extends Component
{
    public function __construct(
        public string $align = 'start',
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
        return view('livewire-ui-kit::components.table.cell');
    }
}
