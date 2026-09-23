<?php

namespace WireKit\View\Components\Textarea;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public ?string $label = null,
        public ?string $description = null,
        public ?bool   $disabled = null,
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.textarea.index');
    }
}
