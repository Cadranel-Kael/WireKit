<?php

namespace WireKit\View\Components\Button;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $link = '',
        public ?string $label = '',
        public bool $loading = false,
        public string $variant = '',
        public string $size = '',
        public string $icon = '',
        public string $iconRight = '',
        public bool $square = false,
    ) {}

    public function variantClass()
    {
        return match ($this->variant) {
            'primary' => 'bg-accent text-accent-foreground shadow hover:bg-accent/90',
            'filled' => 'bg-core-100 text-core-950 hover:bg-core-200',
            'danger' => 'bg-danger text-danger-content shadow hover:bg-danger/90',
            'ghost' => 'bg-none text-content hover:bg-core-100',
            default => 'bg-white border-core-200 border text-800 shadow hover:bg-core-50',
        };
    }

    public function sizeClass()
    {
        if ($this->square && $this->icon) {
            return match ($this->size) {
                'xs' => 'h-6 w-6',
                'sm' => 'h-8 w-8',
                default => 'h-9 w-9'
            };
        } else {
            return match ($this->size) {
                'xs' => 'h-6 px-2',
                'sm' => 'h-8 px-2',
                default => 'h-9 px-3'
            };
        }

    }

    public function render(): View
    {
        return view('wire-kit::components.button.index');
    }
}
