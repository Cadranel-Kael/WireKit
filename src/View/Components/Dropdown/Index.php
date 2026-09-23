<?php

namespace WireKit\View\Components\Dropdown;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $dropdownId;

    public function __construct()
    {
        $this->dropdownId = uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.dropdown.index');
    }
}
