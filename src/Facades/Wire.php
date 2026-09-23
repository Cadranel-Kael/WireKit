<?php

namespace WireKit\Facades;

class Wire
{
//    public static function modal(string $name): ModalProxy
//    {
//        return new ModalProxy($name);
//    }
//
//    public static function modals(): ModalManager
//    {
//        return new ModalManager;
//    }

    public static function toast(string $message, ?string $heading = null, ?string $duration = null, ?string $variant = null): void
    {
        $component = app('livewire')->current();

        if (!$component) {
            throw new \RuntimeException('Wire::toast() must be called within a Livewire request lifecycle.');
        }

        $component->dispatch('toast:show', message: $message, heading: $heading, duration: $duration, variant: $variant);
    }

    public static function success(string $message, ?string $heading = null, ?string $duration = null): void
    {
        $component = app('livewire')->current();

        if (!$component) {
            throw new \RuntimeException('Wire::toast() must be called within a Livewire request lifecycle.');
        }

        $component->dispatch('toast:show', message: $message, heading: $heading, duration: $duration, variant: 'success');
    }

    public static function danger(string $message, ?string $heading = null, ?string $duration = null): void
    {
        $component = app('livewire')->current();

        if (!$component) {
            throw new \RuntimeException('Wire::toast() must be called within a Livewire request lifecycle.');
        }

        $component->dispatch('toast:show', message: $message, heading: $heading, duration: $duration, variant: 'danger');
    }

    public static function warning(string $message, ?string $heading = null, ?string $duration = null): void
    {
        $component = app('livewire')->current();

        if (!$component) {
            throw new \RuntimeException('Wire::toast() must be called within a Livewire request lifecycle.');
        }

        $component->dispatch('toast:show', message: $message, heading: $heading, duration: $duration, variant: 'warning');
    }
}

//class ModalProxy
//{
//    public function __construct(
//        private string $name,
//    )
//    {
//    }
//
//    public function open(): void
//    {
//        $component = app('livewire')->current();
//
//        if ($component) {
//            $component->dispatch('modal:open', name: $this->name);
//        } else {
//            throw new \RuntimeException('WireKit::modal() must be called within a Livewire component context. Use $this->modal() instead.');
//        }
//    }
//
//    public function close(): void
//    {
//        $component = app('livewire')->current();
//
//        if ($component) {
//            $component->dispatch('modal:close', name: $this->name);
//        } else {
//            throw new \RuntimeException('WireKit::modal() must be called within a Livewire component context. Use $this->modal() instead.');
//        }
//    }
//}
//
//class ModalManager
//{
//    public function close(): void
//    {
//        $component = app('livewire')->current();
//
//        if ($component) {
//            $component->dispatch('modal:close-all');
//        } else {
//            throw new \RuntimeException('WireKit::modal() must be called within a Livewire component context. Use $this->modal() instead.');
//        }
//    }
//}
