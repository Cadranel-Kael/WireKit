<?php

namespace WireKit\View\Components\Modal;

use Illuminate\View\Component;

class Index extends Component
{
    public function __construct(
        public string $name = '',
        public bool   $drawer = false,
        public string $position = 'right',
    )
    {
    }

    public function getPositionClasses(): null|string
    {
        if (!$this->drawer) return null;
        return match ($this->position) {
            'right' => 'ml-auto min-h-screen max-w-md transition',
            'left' => 'mr-auto min-h-screen max-w-md',
            'bottom' => 'min-w-screen mt-auto'
        };
    }

    public function render()
    {
        return view('wire-kit::components.modal.index');
    }
}
