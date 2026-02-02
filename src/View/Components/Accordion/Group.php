<?php

namespace WireKit\View\Components\Accordion;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public string $groupId;

    public function __construct(
        public bool $exclusive = false,
        public bool $transition = false,
    )
    {
        $this->groupId = uniqid('group-');
    }

    public function render(): View
    {
        return view('wire-kit::components.accordion.group');
    }
}
