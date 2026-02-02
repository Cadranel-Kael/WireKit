<?php

namespace WireKit\View\Components\Button;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $colorClass = '';

    public function __construct(
        public string $as = 'button',
        public string $href = '',
        public ?string $label = '',
        public bool $loading = false,
        public string $variant = '',
        public string $size = '',
        public string $icon = '',
        public bool $square = false,
        public string $tooltip = '',
        public string $color = '',
        public bool $inset = false,
    ) {
        if ($this->color) {
            $this->colorClass = getColorClass($this->color, variant: 'solid', context: 'button');
        }
    }

    public function variantClass()
    {
        return match ($this->variant) {
            'primary' => 'bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 focus-visible:ring-ring/50 focus-visible:ring-4 outline-none',
            'filled' => 'bg-fill text-fill-foreground hover:bg-fill/60 focus-visible:ring-ring/50 focus-visible:ring-4 outline-none',
            'danger' => 'bg-danger text-danger-foreground shadow-xs hover:bg-danger/90 focus-visible:ring-danger/50 focus-visible:ring-4 outline-none',
            'ghost' => 'bg-none text-core-900 hover:bg-fill dark:text-white dark:hover:bg-core-700 focus-visible:ring-ring/50 focus-visible:ring-4 outline-none',
            'custom' => '',
            default => 'bg-white dark:bg-core-700 not-group-[.button-group]:border not-group-[.button-group]:border-core-200 dark:not-group-[.button-group]:border-core-600 text-core-900 dark:text-white shadow-xs hover:bg-core-50 dark:hover:bg-core-500 focus-visible:ring-ring/50 focus-visible:ring-4 outline-none',
        };
    }

    public function sizeClass()
    {
        return match ($this->size) {
            'xs' => 'not-group-[.input-group]:h-6 px-2'.($this->inset ? ' -mt-2 -me-2 -mb-2 -ms-2' : ''),
            'sm' => 'not-group-[.input-group]:h-8 px-2'.($this->inset ? ' -mt-2 -me-2 -mb-2 -ms-2' : ''),
            default => 'not-group-[.input-group]:h-9 px-3'.($this->inset ? ' -mt-3 -me-3 -mb-3 -ms-3' : '')
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.button.index');
    }
}
