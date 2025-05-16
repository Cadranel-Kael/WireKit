<?php

namespace WireKit\View\Components\Alert;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $variant = '',
        public string $icon = '',
        public string $controls = '',
        public string $actions = '',
        public bool $inline = false,
        public string $heading = '',
        public string $description = '',
    ) {}

    public function variantClass(): string
    {
        return match ($this->variant) {
            'primary' => 'bg-primary text-primary-content',
            'secondary' => 'bg-gray-500 text-white',
            'success' => 'bg-green-500 text-white',
            'danger' => 'bg-red-500 text-white',
            'warning' => 'bg-yellow-500 text-white',
            'info' => 'bg-blue-500 text-white',
            'light' => 'bg-gray-200 text-gray-800',
            'dark' => 'bg-gray-800 text-white',
            default => 'bg-blue-500 text-white',
        };
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.alert.index');
    }
}
