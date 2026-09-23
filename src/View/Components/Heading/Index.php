<?php

namespace WireKit\View\Components\Heading;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $sizeClass;

    public function __construct(
        public ?int $level = null,
        public string $size = 'base',
    ) {
        $this->sizeClass = $this->sizeClass();
    }

    public function sizeClass()
    {
        return match ($this->size) {
            'xs' => 'text-xs',
            'sm' => 'text-sm',
            'base' => 'text-base',
            'lg' => 'text-lg',
            'xl' => 'text-xl',
            '2xl' => 'text-2xl',
            '3xl' => 'text-3xl',
            '4xl' => 'text-4xl',
            '5xl' => 'text-5xl',
            '6xl' => 'text-6xl',
            '7xl' => 'text-7xl',
            '8xl' => 'text-8xl',
            '9xl' => 'text-9xl',
            default => '',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.heading.index');
    }
}
