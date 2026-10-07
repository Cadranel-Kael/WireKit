<?php

namespace WireKit\View\Components\Fieldset;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $variant = '',
        public string $legend = '',
        public bool   $collapsible = false,
        public bool   $expanded = true,
    )
    {
    }

    public function variantClass(): string
    {
        return match ($this->variant) {
            'card' => 'border-border bg-muted/40 block rounded-xl border',
            default => '',
        };
    }

    public function fieldsClass(): string
    {
        return match ($this->variant) {
            'card' => 'bg-card ring-border rounded-xl px-4 py-2 ring-1',
            default => '',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.fieldset.index');
    }
}
