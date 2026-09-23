<?php

namespace WireKit\View\Components\Table;

use Illuminate\View\Component;
use Illuminate\View\View;

class Rows extends Component
{
    public function __construct(
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.table.rows');
    }
}
