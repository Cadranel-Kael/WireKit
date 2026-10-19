<?php

namespace WireKit\View\Components\InlineEdit;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * Click-to-rename text: shows the value as static content until triggered
 * (by clicking the display, or an external element with
 * data-wire-inline-edit-trigger="{id}"), then swaps in a text input. Enter
 * or blur commits and dispatches an "inline-edit:save" event (detail:
 * { value }); Escape cancels.
 */
class Index extends Component
{
    public ?string $id;

    public function __construct(
        public string $value = '',
        public bool $triggerOnClick = true,
        ?string $id = null,
    ) {
        $this->id = $id;
    }

    /**
     * Resolve the DOM id for the inline-edit element. An explicit id wins,
     * then the element's wire:key (prefixed so loop keys like "1" don't
     * collide across components): Livewire's morph keys elements off their
     * id, so a fresh uniqid() on every render would swap the element on each
     * update. A random id is the last resort, for editors that never morph.
     *
     * Memoized so the id stays stable across the render lifecycle.
     */
    public function resolveId(?string $wireKey = null): string
    {
        return $this->id ??= ($wireKey ? 'inline-edit-' . $wireKey : 'inline-edit-' . uniqid());
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
        return view('wire-kit::components.inline-edit.index');
    }
}
