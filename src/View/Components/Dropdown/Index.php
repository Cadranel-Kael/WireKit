<?php

namespace WireKit\View\Components\Dropdown;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public ?string $id;

    public string $dropdownId;

    public function __construct(?string $id = null)
    {
        $this->id = $id;
        $this->dropdownId = '';
    }

    /**
     * Resolve the dropdown id used to link trigger and menu elements. An
     * explicit id wins, then the element's wire:key (prefixed so loop keys
     * like "1" don't collide across components): Livewire's morph keys
     * elements off their id, so a fresh uniqid() on every render would swap
     * the trigger/menu elements on each update. A random id is the last
     * resort, for dropdowns that never morph.
     */
    public function resolveDropdownId(?string $wireKey = null): string
    {
        return $this->id ?? ($wireKey ? 'dropdown-' . $wireKey : 'dropdown-' . uniqid());
    }

    public function render(): View
    {
        $this->dropdownId = $this->resolveDropdownId($this->attributes->get('wire:key'));

        return view('wire-kit::components.dropdown.index');
    }
}
