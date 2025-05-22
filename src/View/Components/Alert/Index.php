<?php

namespace WireKit\View\Components\Alert;

use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Index extends Component
{
    public string $colorClass;

    public function __construct(
        public string $variant = '',
        public string $color = '',
        public string $icon = '',
        public string $controls = '',
        public string $actions = '',
        public bool   $inline = false,
        public string $heading = '',
        public string $description = '',
    )
    {
        $this->colorClass = getColorClass(color: $color, variant: 'border');
        $this->variant();
    }

    public function variant()
    {
        if ($this->variant) {
            match ($this->variant) {
                'success' => $this->colorClass = getColorClass(color: 'green', variant: 'border'),
                'danger' => $this->colorClass = getColorClass(color: 'red', variant: 'border'),
                'warning' => $this->colorClass = getColorClass(color: 'yellow', variant: 'border'),
            };
        }
    }

    public function render(): View
    {
        return view('wire-kitt::components.alert.index');
    }
}
