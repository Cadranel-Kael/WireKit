<?php

namespace WireKit\View\Components\Link;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $href = '',
        public string $variant = '',

    )
    {
    }

    public function variantClass()
    {
        return match ($this->variant) {
            'subtle' => 'hover:text-foreground text-muted-foreground dark:text-core-500 dark:hover:text-white transition-colors',
            default => 'decoration-core-300 dark:decoration-core-500 dark:hover:decoration-white hover:decoration-core-800 inline-block underline underline-offset-4',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.link.index');
    }
}
