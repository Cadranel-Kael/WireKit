<?php

namespace WireKit\View\Components\Tree;

use Illuminate\View\Component;
use Illuminate\View\View;

/*
 * A nestable treeview component.
 */

class Index extends Component
{
    public string $id;

    public function __construct(
        ?string       $id = null,
        public string $variant = 'file',
        public bool   $sortable = false,
        public bool   $nested = true,
    )
    {
        $this->id = $id ?? 'tree-' . uniqid();
    }

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
