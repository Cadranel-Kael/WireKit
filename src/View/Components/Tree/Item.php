<?php

namespace WireKit\View\Components\Tree;

use Illuminate\View\Component;
use Illuminate\View\View;

/*
 * A single node in a tree. Nest <wire:tree.item> components inside the
 * default slot to build branches of arbitrary depth.
 */

class Item extends Component
{
    public string $id;

    public function __construct(
        ?string        $id = null,
        public string  $label = '',
        public string  $icon = '',
        public bool    $expanded = false,
        public bool    $disabled = false,
        public bool    $draggable = true,
        public ?string $href = null,
    )
    {
        $this->id = $id ?? 'tree-item-' . uniqid();
    }

    public function rowClass(string $variant, bool $sortable): string
    {
        return trim(implode(' ', array_filter([
            $variant === 'list' ? 'bg-background border-background rounded-xl border px-4 py-2.5 shadow-sm first:mt-px' : null,
            $variant === 'list' && $sortable ? 'dragging:border-primary dragging:bg-primary/50 dragging:*:opacity-0 dragging:border-dashed relative pr-2.5 pl-1.5' : null,
            $variant === 'file' ? 'text-muted-foreground hover:bg-muted' : null,
        ])));
    }

    public function groupClass(string $variant): string
    {
        return match ($variant) {
            'file' => 'border-border ml-2 border-l pl-2',
            'list' => 'ml-4 [&>*:first-child>*]:rounded-tl-none',
            default => 'ml-4',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.tree.item');
    }
}
