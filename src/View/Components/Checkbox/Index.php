<?php

namespace WireKit\View\Components\Checkbox;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $label = '',
        public string $description = '',
    ) {}

    public function labelClasses($attributes): string
    {
        return $attributes->get('label:class', '');
    }

    public function descriptionClasses($attributes): string
    {
        return $attributes->get('description:class', '');
    }

    public function descriptionPosition($attributes): string
    {
        return $attributes->get('description:position', 'block');
    }

    public function render(): View
    {
        return view('wire-kit::components.checkbox.index');
    }
}
