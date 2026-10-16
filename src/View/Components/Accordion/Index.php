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
     * @return array{id: string, contentId: string, headingId: string}
     */
    public function resolveIds(?string $wireKey = null): array
    {
        $suffix = $wireKey ? '-' . $wireKey : '-' . uniqid();

        return [
            'id' => $this->id ?? 'accordion-item' . $suffix,
            'contentId' => $this->contentId ?? 'content' . $suffix,
            'headingId' => $this->headingId ?? 'heading' . $suffix,
        ];
    }

    public function render(): View
    {
        [
            'id' => $this->id,
            'contentId' => $this->contentId,
            'headingId' => $this->headingId,
        ] = $this->resolveIds($this->attributes->get('wire:key'));

        return view('wire-kit::components.accordion.index');
    }
}
