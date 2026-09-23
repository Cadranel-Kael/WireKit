<?php

namespace WireKit\View\Components\Command;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public string $id;

    public function __construct(
        public string $heading,
    ) {
        $this->id = 'command-group-'.uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.command.group');
    }
}
