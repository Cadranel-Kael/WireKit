<?php

namespace WireKit\Traits;

use Fruitcake\LaravelDebugbar\Facades\Debugbar;

trait WithModal
{
    public function modal(string $modal): ModalProxy
    {
        return new ModalProxy($modal, $this);
    }
}

class ModalProxy
{
    public function __construct(
        private string              $name,
        private \Livewire\Component $component
    )
    {
    }

    public function open(): void
    {
        $this->component->dispatch('modal:show', name: $this->name);
    }

    public function close(): void
    {
        $this->component->dispatch('modal:close', name: $this->name);
    }
}
