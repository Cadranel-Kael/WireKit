<?php

namespace WireKit\View\Components\Context;

use Illuminate\View\Component;

class Menu extends Component
{
    public ?string $id;

    public string $menuId;

    public function __construct(?string $id = null)
    {
        $this->id = $id;
        $this->menuId = '';
    }

    /**
     * Resolve the DOM id for the context menu. An explicit id wins, then the
     * element's wire:key (prefixed so loop keys like "1" don't collide
     * across components): Livewire's morph keys elements off their id, so a
     * fresh uniqid() on every render would swap the element on each update.
     * A random id is the last resort, for menus that never morph.
     */
    public function resolveMenuId(?string $wireKey = null): string
    {
        return $this->id ?? ($wireKey ? 'menu-' . $wireKey : 'menu-' . uniqid());
    }

    public function render()
    {
        $this->menuId = $this->resolveMenuId($this->attributes->get('wire:key'));

        return view('wire-kit::components.context.menu');
    }
}
