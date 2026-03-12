<?php

namespace WireKit\Facades;

class WireKit
{
    public static function modal(string $name): ModalProxy
    {
        return new ModalProxy($name);
    }

    public static function modals(): ModalManager
    {
        return new ModalManager();
    }
}

class ModalProxy
{
    public function __construct(
        private string $name,
    )
    {
    }

    public function open(): void
    {
        $component = app('livewire')->current();

        if ($component) {
            $component->dispatch('modal:open', name: $this->name);
        } else {
            throw new \RuntimeException('WireKit::modal() must be called within a Livewire component context. Use $this->modal() instead.');
        }
    }

    public function close(): void
    {
        $component = app('livewire')->current();

        if ($component) {
            $component->dispatch('modal:close', name: $this->name);
        } else {
            throw new \RuntimeException('WireKit::modal() must be called within a Livewire component context. Use $this->modal() instead.');
        }
    }
}

class ModalManager
{
    public function close(): void
    {
        $component = app('livewire')->current();

        if ($component) {
            $component->dispatch('modal:close-all');
        } else {
            throw new \RuntimeException('WireKit::modal() must be called within a Livewire component context. Use $this->modal() instead.');
        }
    }
}
