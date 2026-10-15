<?php

namespace WireKit\View\Components\Tree;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * A nestable treeview component.
 */
class Index extends Component
{
    public ?string $id;

    public function __construct(
        ?string       $id = null,
        public string $variant = 'file',
        public bool   $sortable = false,
        public bool   $nested = true,
    )
    {
        $this->id = $id;
    }

    /**
     * Resolve the DOM id for the rendered element. An explicit id wins, then
     * the element's wire:key: Livewire's morph keys elements off their id, so
     * rendering a fresh uniqid() on every request would make it swap the whole
     * subtree -- dropping every listener the Tree JS bound inside it -- on each
     * update. A random id is the last resort, for trees that never morph.
     */
    public function resolveId(?string $wireKey = null): string
    {
        return $this->id ?? $wireKey ?? 'tree-' . uniqid();
    }

    /**
     * Determine the spacing class for the tree's variant.
     */
    public function variantClass(): string
    {
        return match ($this->variant) {
            'file' => 'gap-0.5',
            default => '',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.tree.index');
    }
}
