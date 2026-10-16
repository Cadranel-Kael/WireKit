<?php

namespace WireKit\View\Components\Toggle;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public ?string $id;

    public string $groupId;

    public function __construct(
        public bool $exclusive = false,
        ?string $id = null,
    ) {
        $this->id = $id;
        $this->groupId = '';
    }

    /**
     * Resolve the DOM id for the toggle group. An explicit id wins, then the
     * element's wire:key (prefixed so loop keys like "1" don't collide
     * across components): Livewire's morph keys elements off their id, so a
     * fresh uniqid() on every render would swap the element on each update.
     * A random id is the last resort, for groups that never morph.
     */
    public function resolveGroupId(?string $wireKey = null): string
    {
        return $this->id ?? ($wireKey ? 'toggle-group-' . $wireKey : 'toggle-group-' . uniqid());
    }

    public function render(): View
    {
        $this->groupId = $this->resolveGroupId($this->attributes->get('wire:key'));

        return view('wire-kit::components.toggle.group');
    }
}
