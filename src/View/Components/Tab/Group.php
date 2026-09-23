<?php

namespace WireKit\View\Components\Tab;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public string $groupId;

    public function __construct(?string $id = null)
    {
        $this->groupId = $id ?? uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.tab.group');
    }
}
