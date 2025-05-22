<?php

namespace WireKit\View\Components\Table;

use Illuminate\Support\Collection;
use Illuminate\View\Component;
use Illuminate\View\View;
use Str;

class Row extends Component
{
    public function __construct(
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.table.row');
    }
}
