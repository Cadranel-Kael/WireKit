<?php

namespace WireKit\View\Components\Input;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public ?string $label = null,
        public ?string $description = null,
        public ?string $size = null,
        public string  $icon = '',
        public string  $prefix = '',
        public string  $suffix = '',
        public string  $error = '',
        public bool    $clearable = false,
        public bool    $revealable = false,
        public bool    $copyable = false,
        public string  $iconAfter = '',
    )
    {
    }

    public function sizeClass()
    {
        return match ($this->size) {
            'sm' => 'px-2 py-1',
            default => 'px-3 py-2',
        };
    }

    public function resolvedName(): ?string
    {
        if ($name = $this->attributes->get('name')) {
            return $name;
        }

        foreach ($this->attributes->getAttributes() as $key => $value) {
            if ($key === 'wire:model' || str_starts_with($key, 'wire:model.')) {
                return $value;
            }
        }

        return null;
    }

    public function render(): View
    {
        return view('wire-kit::components.input.index');
    }
}
