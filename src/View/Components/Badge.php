<?php

namespace WireKit\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Badge extends Component
{
    public function __construct(
        public string $variant = '',
        public string $icon = '',
    )
    {
    }

    public function variantClass(): string
    {
        return match ($this->variant) {
            'primary' => 'bg-primary text-primary-content',
            'secondary' => 'bg-gray-500 text-white',
            'success' => 'bg-green-500 text-white',
            'success-outlined' => 'bg-success/10 text-success border border-success/50',
            'error' => 'bg-error text-white',
            'error-outlined' => 'bg-error/10 text-error border border-error/50',
            'warning' => 'bg-yellow-500 text-white',
            'info' => 'bg-blue-500 text-white',
            'light' => 'bg-gray-200 text-gray-800',
            'dark' => 'bg-gray-800 text-white',
            default => 'bg-blue-500 text-white',
        };
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.badge');
    }
}
