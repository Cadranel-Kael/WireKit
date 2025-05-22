<?php

namespace WireKit\View\Components\Badge;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $colorClass;

    public function __construct(
        public string $color = 'zinc',
        public string $colorVariant = '',
        public string $size = '',
        public string $variant = '',
        public string $icon = '',
        public string $iconRight = '',
        public string $as = '',
    ) {
        $this->colorClass = getColorClass($this->color, $this->colorVariant, $this->as);
    }

    public function variantClass(): string
    {
        return match ($this->variant) {
            'pill' => 'rounded-full',
            default => 'rounded'
        };
    }

    public function sizeClass(): string
    {
        return match ($this->size) {
            'sm' => match ($this->variant) {
                'pill' => 'text-xs py-1 px-4',
                default => 'text-xs py-1 px-2',
            },
            'large' => match ($this->variant) {
                'pill' => 'text-sm py-1.5 px-4',
                default => 'text-sm py-1.5 px-2',
            },
            default => match ($this->variant) {
                'pill' => 'text-sm py-1 px-4',
                default => 'text-sm py-1 px-2',
            },
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.badge.index');
    }
}
