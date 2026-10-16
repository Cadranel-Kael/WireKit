<?php

namespace WireKit\View\Components\Command;

use Illuminate\View\Component;
use Illuminate\View\View;

class Group extends Component
{
    public ?string $id;

    public function __construct(
        public string $heading,
        ?string $id = null,
    ) {
        $this->id = $id;
    }

    /**
     * Resolve the DOM id for the command group heading. An explicit id wins,
     * then the element's wire:key (prefixed so loop keys like "1" don't
     * collide across components): Livewire's morph keys elements off their
     * id, so a fresh uniqid() on every render would swap the element on each
     * update. A random id is the last resort, for groups that never morph.
     */
    public function resolveId(?string $wireKey = null): string
    {
        return $this->id ?? ($wireKey ? 'command-group-' . $wireKey : 'command-group-' . uniqid());
    }

    public function render(): View
    {
        $this->id = $this->resolveId($this->attributes->get('wire:key'));

        return view('wire-kit::components.command.group');
    }
}
