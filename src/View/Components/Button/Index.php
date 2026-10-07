<?php

namespace WireKit\View\Components\Button;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $colorClass = '';

    public function __construct(
        public string  $as = 'button',
        public string  $href = '',
        public ?string $label = '',
        public bool    $loading = false,
        public string  $variant = '',
        public string  $size = '',
        public string  $icon = '',
        public bool    $square = false,
        public string  $color = '',
        public bool    $inset = false,
        public string  $tooltip = '',
    )
    {
        if ($this->color) {
            $this->colorClass = getColorClass($this->color, variant: 'solid', context: 'button');
        }
    }

    public function variantClass()
    {
        return match ($this->variant) {
            'primary' => 'bg-accent text-accent-foreground border border-accent hover:bg-accent/80 disabled:bg-accent/50 disabled:border-accent/50 focus-visible:ring-4 focus-visible:ring-accent/50 outline-none',
            'filled' => 'bg-fill text-fill-foreground hover:bg-fill/60 focus-visible:ring-ring/50 focus-visible:ring-4 outline-none',
            'danger' => 'bg-danger text-danger-foreground shadow-xs hover:bg-danger/90 focus-visible:ring-danger/50 focus-visible:ring-4 outline-none',
            'ghost' => 'bg-none text-foreground hover:bg-muted',
            'custom' => '',
            default => 'bg-background text-foreground border border-border hover:bg-foreground/5 focus-visible:ring-4 focus-visible:ring-foreground/20 outline-none',
        };
    }

    public function sizeClass()
    {
        return match ($this->size) {
            'xs' => 'h-6 px-2' . ($this->inset ? ' -mt-2 -me-2 -mb-2 -ms-2' : ''),
            'sm' => 'h-8 px-2' . ($this->inset ? ' -mt-2 -me-2 -mb-2 -ms-2' : ''),
            default => 'h-9 px-3' . ($this->inset ? ' -mt-3 -me-3 -mb-3 -ms-3' : '')
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.button.index');
    }
}
