<?php

namespace WireKit\View\Components\Context;

use Illuminate\View\Component;

class Index extends Component
{
    public function __construct(
    )
    {
    }


    public function render()
    {
        return view('wire-kit::components.context.index');
    }
}
