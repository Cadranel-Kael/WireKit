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
        public ?string $href = null,
    )
    {
        $this->id = $id ?? 'tree-item-' . uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.tree.item');
    }
}
