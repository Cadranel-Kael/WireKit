<?php

namespace WireKit\View\Components\Toggle;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $icon = '',
        public string $variant = '',
        public string $size = '',
        public bool $active = false,
    ) {}

    public function variantClasses()
    {
        return match ($this->variant) {
            'outline' => 'border border-border',
            default => '',
        };
    }

    public function sizeClasses()
    {
        return match ($this->size) {
            'sm' => 'px-1 h-6 min-w-6 gap-0.5 text-xs',
            'lg' => 'px-2 h-10 min-w-10 gap-1 text-sm',
            default => 'px-2 h-8 min-w-8 gap-1 text-sm'
        };
    }

    public function iconSize()
    {
        return match ($this->size) {
            'sm' => '4',
            'lg' => '5',
            default => '5'
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.toggle.index');
    }
}
