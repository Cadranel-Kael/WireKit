<?php

namespace WireKit\View\Components\Avatar;

use Illuminate\View\Component;

class Index extends Component
{
    public $colorClass = '';

    public $badgeColorClass = '';

    public $badgePositionClass = '';

    public $badgeVariantClass = '';

    public function __construct(
        public string $src = '',
        public string $name = '',
        public string $initials = '',
        public string $size = '',
        public string $icon = '',
        public string $color = 'core',
        public bool $circle = false,
        public string $badge = '',
        public string $badgeColor = '',
        public string $badgePosition = 'right bottom',
        public bool $badgeCircle = false,
        public string $badgeVariant = '',
    ) {
        $this->colorClass = getColorClass($this->color);
        if ($this->badge === '1') {
            $this->badge = ' ';
        }
        $this->badgeColorClass = getColorClass($this->badgeColor, variant: 'solid');
        $this->badgePositionClass = $this->badgePositionClass();
        $this->badgeVariantClass = $this->badgeVariantClass();
    }

    public function sizeClass()
    {
        return match ($this->size) {
            'xs' => 'w-6 h-6',
            'sm' => 'w-8 h-8',
            'lg' => 'w-12 h-12',
            'xl' => 'w-14 h-14',
            default => 'w-10 h-10',
        };
    }

    public function badgePositionClass()
    {
        if ($this->badgePosition) {
            $positionClass = '';
            $badgePosition = explode(' ', $this->badgePosition);
            foreach ($badgePosition as $position) {
                $positionClass .= match ($position) {
                    'top' => 'top-0 ',
                    'left' => 'left-0 ',
                    'right' => 'right-0 ',
                    'bottom' => 'bottom-0 ',
                    default => '',
                };
            }

            return $positionClass;
        }
    }

    public function badgeVariantClass()
    {
        return match ($this->badgeVariant) {
            'outline' => 'after:h-2 after:w-2 after:bg-white '.($this->badgeCircle ? 'after:rounded-full' : 'after:rounded'),
            default => ''
        };
    }

    public function render()
    {
        return view('wire-kit::components.avatar.index');
    }
}
