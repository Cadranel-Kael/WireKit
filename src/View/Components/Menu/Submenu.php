<?php

namespace WireKit\View\Components\Menu;

use Illuminate\View\Component;
use Illuminate\View\View;

class Submenu extends Component
{
    public ?string $id;

    public function __construct(
        public string $heading = '',
        public string $placement = 'right-start',
        ?string $id = null,
    )
    {
        $this->id = $id;
    }

    /**
     * Resolve the DOM id for the submenu. An explicit id wins, then the
     * element's wire:key (prefixed so loop keys like "1" don't collide
     * across components): Livewire's morph keys elements off their id, so a
     * fresh uniqid() on every render would swap the element on each update.
     * A random id is the last resort, for submenus that never morph.
     */
    public function resolveId(?string $wireKey = null): string
    {
        return $this->id ?? ($wireKey ? 'submenu-' . $wireKey : 'submenu-' . uniqid());
    }

    public function render(): View
    {
        $this->id = $this->resolveId($this->attributes->get('wire:key'));

        return view('wire-kit::components.menu.submenu');
    }
}
