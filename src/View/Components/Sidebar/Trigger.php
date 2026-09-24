<?php

namespace WireKit\View\Components\Sidebar;

use Illuminate\View\Component;

/*
 * A button that opens/closes the <wire:sidebar> whose id matches $for
 * (default "sidebar"). $action pins the button to always "open" or always
 * "close" instead of the default "toggle" -- handy when you want a
 * dedicated open button (e.g. in a collapsed rail) separate from a
 * dedicated close button (e.g. inside the sidebar itself).
 */
class Trigger extends Component
{
    public function __construct(
        public string $for = 'sidebar',
        public string $action = 'toggle',
    ) {}

    public function render(): \Illuminate\View\View
    {
        return view('wire-kit::components.sidebar.trigger');
    }
}
