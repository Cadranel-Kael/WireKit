<?php

namespace LivewireUIKit\View\Components\Layouts\Auth;

use Illuminate\View\Component;
use Illuminate\View\View;

class Simple extends Component
{
    public function render(): View
    {
        return view('wire-kit::components.layouts.auth.simple');
    }
}
