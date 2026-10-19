<?php

namespace WireKit\View\Components\Accordion;

use Illuminate\View\Component;
use Illuminate\View\View;

/**
 * A single collapsible accordion item.
 */
class Index extends Component
{
    public ?string $id;

    public ?string $contentId;

    public ?string $headingId;

    /** @var array{id: string, contentId: string, headingId: string}|null */
    protected ?array $resolvedIds = null;

    public function __construct(
        public string $heading = '',
        public bool   $expanded = false,
        public bool   $disabled = false,
        ?string $id = null,
        ?string $contentId = null,
        ?string $headingId = null,
    )
    {
        $this->id = $id;
        $this->contentId = $contentId;
        $this->headingId = $headingId;
    }

    /**
     * Resolve the DOM ids for the accordion item, its content, and its
     * heading. An explicit id wins, then the element's wire:key (prefixed so
     * loop keys like "1" don't collide across components): Livewire's morph
     * keys elements off their id, so a fresh uniqid() on every render would
     * swap the elements on each update. Random ids are the last resort, for
     * items that never morph.
     *
     * Memoized so the ids stay stable across the render lifecycle.
     *
     * @return array{id: string, contentId: string, headingId: string}
     */
    public function resolveIds(?string $wireKey = null): array
    {
        if ($this->resolvedIds === null) {
            $suffix = $wireKey ? '-' . $wireKey : '-' . uniqid();

            $this->resolvedIds = [
                'id' => $this->id ?? 'accordion-item' . $suffix,
                'contentId' => $this->contentId ?? 'content' . $suffix,
                'headingId' => $this->headingId ?? 'heading' . $suffix,
            ];
        }

        return $this->resolvedIds;
    }

    /**
     * Resolve the ids once the tag's attributes arrive. Blade applies them
     * via withAttributes() after render() -- where $this->attributes is still
     * null -- but before the view renders, so this is the first point the
     * wire:key is readable.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function withAttributes(array $attributes): static
    {
        parent::withAttributes($attributes);

        [
            'id' => $this->id,
            'contentId' => $this->contentId,
            'headingId' => $this->headingId,
        ] = $this->resolveIds($this->attributes->get('wire:key'));

        return $this;
    }

    public function render(): View
    {
        return view('wire-kit::components.accordion.index');
    }
}
