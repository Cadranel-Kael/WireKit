<?php

namespace WireKit\View\Components\Textarea;

use Illuminate\View\Component;
use Illuminate\View\View;

class Textarea extends Component
{
    public function __construct(
        public ?bool $disabled = null,
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.textarea.textarea');
    }
}
