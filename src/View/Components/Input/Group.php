<?php

namespace WireKit\View\Components\Input;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public function __construct(
        public bool $isInGroup = true,
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.input.group.index');
    }
}
