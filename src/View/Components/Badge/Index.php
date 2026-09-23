<?php

namespace WireKit\View\Components\Badge;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $colorClass;

    public string $dotColorClass;

    public function __construct(
        public string $color = 'core',
        public string $colorVariant = '',
        public string $size = '',
        public string $variant = '',
        public string $icon = '',
        public string $iconRight = '',
        public string $as = '',
        public bool $dot = false,
    )
    {
        $this->colorClass = getColorClass($this->color, $this->colorVariant, $this->as);
        // A status dot is always a solid fill, regardless of $colorVariant
        // -- the "soft" tint that suits a padded pill reads as barely-there
        // at a 0.5rem circle.
        $this->dotColorClass = getColorClass($this->color, 'solid');
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
            'l' => match ($this->variant) {
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
