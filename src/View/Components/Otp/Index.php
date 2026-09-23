<?php

namespace WireKit\View\Components\Otp;

use Illuminate\View\Component;

class Index extends Component
{
    public function __construct(
        public int    $length = 6,
        public string $label = '',
    )
    {
    }

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.otp.index');
    }
}
