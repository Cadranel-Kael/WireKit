<?php

namespace WireKit\View\Components\Radio;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public ?string $id;

    public function __construct(
        public string $label = '',
        public bool $required = false,
        ?string $id = null,
    ) {
        $this->id = $id;
    }

    /**
     * Resolve the DOM id for the radio input. An explicit id wins, then the
     * element's wire:key (prefixed so loop keys like "1" don't collide
     * across components): Livewire's morph keys elements off their id, so a
     * fresh uniqid() on every render would swap the element on each update.
     * A random id is the last resort, for radios that never morph.
     *
     * Memoized so the id stays stable across the render lifecycle.
     */
    public function resolveId(?string $wireKey = null): string
    {
        return $this->id ??= ($wireKey ? 'radio-' . $wireKey : 'radio-' . uniqid());
    }

    /**
     * Resolve the id once the tag's attributes arrive. Blade applies them via
     * withAttributes() after render() -- where $this->attributes is still
     * null -- but before the view renders, so this is the first point the
     * wire:key is readable.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function withAttributes(array $attributes): static
    {
        parent::withAttributes($attributes);

        $this->resolveId($this->attributes->get('wire:key'));

        return $this;
    }

    public function render(): View
    {
        return view('wire-kit::components.radio.index');
    }
}
