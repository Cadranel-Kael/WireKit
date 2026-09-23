<?php

namespace WireKit\View\Components\Field;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $labelId = '',
        public string $descriptionId = '',
        public string $display = 'block',
    )
    {
        if (!$this->labelId) {
            $this->labelId = uniqid('label-');
        }
        if (!$this->descriptionId) {
            $this->descriptionId = uniqid('description-');
        }
    }

    public function descriptionPosition($attributes): string
    {
        return $attributes->get('description:position', '');
    }

    public function render(): View
    {
        return view('wire-kit::components.field.index');
    }
}
