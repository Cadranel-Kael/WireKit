<?php

namespace WireKit\View\Components\Sidebar;

use Illuminate\View\Component;

/*
 * Collapsible app sidebar. Toggle it from <wire:sidebar.trigger> or any
 * element carrying data-wire-sidebar-trigger="{id}"; open/closed state is
 * then remembered client-side in a "wire-sidebar-{id}" cookie so it
 * survives reloads.
 */
class Index extends Component
{
    public function __construct(
        public bool $sticky = false,
        public string $id = 'sidebar',
        public bool $open = true,
    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.sidebar.index');
    }
}
