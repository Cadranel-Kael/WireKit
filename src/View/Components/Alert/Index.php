<?php

namespace WireKit\View\Components\Alert;

use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Index extends Component
{
    public string $colorClass;

    public string $descriptionClass;

    public function __construct(
        public string $variant = '',
        public string $color = '',
        public string $icon = '',
        public string $iconVariant = '',
        public string $controls = '',
        public string $actions = '',
        public bool $inline = false,
        public string $heading = '',
        public string $description = '',
    ) {
        $this->colorClass = getColorClass(color: $color, variant: 'border');
        $this->descriptionClass = '';
        $this->variant();
    }

    public function variant()
    {
        if ($this->variant) {
            [$this->colorClass, $this->descriptionClass] = match ($this->variant) {
                'success' => ['bg-green-100 text-green-800', 'text-green-700'],
                'danger' => ['bg-red-100 text-red-800', 'text-red-700'],
                'warning' => ['bg-orange-100 text-orange-800', 'text-orange-700'],
                default => ['', '']
            };
        }
    }

    public function render(): View
    {
        return view('wire-kit::components.alert.index');
    }
}
