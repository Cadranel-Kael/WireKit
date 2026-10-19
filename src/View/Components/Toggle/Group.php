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
     *
     * Memoized so the id stays stable across the render lifecycle.
     */
    public function resolveGroupId(?string $wireKey = null): string
    {
        if ($this->groupId === '') {
            $this->groupId = $this->id ?? ($wireKey ? 'toggle-group-' . $wireKey : 'toggle-group-' . uniqid());
        }

        return $this->groupId;
    }

    /**
     * Resolve the group id once the tag's attributes arrive. Blade applies
     * them via withAttributes() after render() -- where $this->attributes is
     * still null -- but before the view renders, so this is the first point
     * the wire:key is readable.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function withAttributes(array $attributes): static
    {
        parent::withAttributes($attributes);

        $this->resolveGroupId($this->attributes->get('wire:key'));

        return $this;
    }

    public function render(): View
    {
        return view('wire-kit::components.toggle.group');
    }
}
