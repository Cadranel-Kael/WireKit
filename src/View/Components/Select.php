<?php

namespace WireKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Select extends Component
{
    public string $id;

    public function __construct(
        public string $label = '',
        public bool $labelSrOnly = false,
        public string $placeholder = '',
        public bool $clearable = false,
        public string $hint = '',
        public bool $required = false,
        public string $inputClass = '',
        public array $options = [],
    )
    {
        $this->id = uniqid();
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.select');
    }
}
