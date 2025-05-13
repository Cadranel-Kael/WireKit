<?php

namespace LivewireUIKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Input extends Component
{
    public string $id;

    public function __construct(
        public string $label = '',
        public bool $labelSrOnly = false,
        public string $placeholder = '',
        public bool $clearable = false,
        public string $hint = '',
        public string $icon = '',
        public string $rightIcon = '',
        public string $type = 'text',
        public bool $required = false,
        public string $inputClass = '',
        public string $iconClass = '',
    )
    {
        $this->id = uniqid();
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.input');
    }
}
