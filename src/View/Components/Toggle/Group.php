<?php

namespace WireKit\View\Components\Toggle;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public $groupId;

    public function __construct(
        public bool $exclusive = false,
    ) {
        $this->groupId = uniqid('group-');
    }

    public function render(): View
    {
        return view('wire-kit::components.toggle.group');
    }
}
