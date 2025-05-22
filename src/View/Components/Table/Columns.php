<?php

namespace WireKit\View\Components\Table;

use Illuminate\Support\Collection;
use Illuminate\View\Component;
use Illuminate\View\View;
use Str;

class Columns extends Component
{
    public function __construct(
    ) {}

    public function render(): View
    {
        return view('livewire-ui-kit::components.table.columns');
    }
}
