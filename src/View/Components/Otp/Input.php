<?php

namespace WireKit\View\Components\Otp;

use Illuminate\View\Component;

class Input extends Component
{
    public function __construct()
    {
    }

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.otp.input');
    }
}
