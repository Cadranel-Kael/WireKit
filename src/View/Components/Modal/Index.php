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
            'right' => 'ml-auto min-h-screen max-w-md closing:animate-slide-to-right open:animate-slide-from-right',
            'left' => 'mr-auto min-h-screen max-w-md closing:animate-slide-to-left open:animate-slide-from-left',
            'bottom' => 'min-w-screen mt-auto closing:animate-slide-to-bottom open:animate-slide-from-bottom',
        };
    }

    public function render()
    {
        return view('wire-kit::components.modal.index');
    }
}
