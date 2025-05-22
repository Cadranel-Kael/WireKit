<?php

namespace WireKit\View\Components\Accordion;

use Illuminate\View\Component;
use Illuminate\View\View;

class Content extends Component
{
    public function __construct(
    ) {}

    public function render(): View
    {
        return view('wire-kit::components.accordion.content');
    }
}
