<?php

namespace WireKit\View\Components\Checkbox;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public function __construct(
        public string $legend = '',
    ) {}

    public function descriptionPosition($attributes): string
    {
        return $attributes->get('description:position', 'block');
    }

    public function render(): View
    {
        return view('wire-kit::components.checkbox.group');
    }
}
