<?php

namespace WireKit\Traits;

trait WithToasts
{
    public function toast(string $message, ?string $heading = null): void
    {
        $this->dispatch('toast:show', message: $message, heading: $heading);
    }
}
