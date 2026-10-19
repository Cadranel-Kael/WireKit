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
     *
     * Memoized so the trigger and menu -- which each resolve the id through
     * @aware -- render the same id.
     */
    public function resolveDropdownId(?string $wireKey = null): string
    {
        if ($this->dropdownId === '') {
            $this->dropdownId = $this->id ?? ($wireKey ? 'dropdown-' . $wireKey : 'dropdown-' . uniqid());
        }

        return $this->dropdownId;
    }

    /**
     * Resolve the dropdown id once the tag's attributes arrive. Blade applies
     * them via withAttributes() after render() -- where $this->attributes is
     * still null -- but before any nested trigger/menu view renders, so this
     * is the first point the wire:key is readable.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function withAttributes(array $attributes): static
    {
        parent::withAttributes($attributes);

        $this->resolveDropdownId($this->attributes->get('wire:key'));

        return $this;
    }

    public function render(): View
    {
        return view('wire-kit::components.dropdown.index');
    }
}
