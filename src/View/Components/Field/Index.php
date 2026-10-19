<?php

namespace WireKit\View\Components\Field;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    /** @var array{labelId: string, descriptionId: string}|null */
    protected ?array $resolvedIds = null;

    public function __construct(
        public ?string $labelId = null,
        public ?string $descriptionId = null,
        public string $display = 'block',
    )
    {
    }

    /**
     * Resolve the DOM ids for the field's label and description. An explicit
     * id wins, then the element's wire:key (prefixed so loop keys like "1"
     * don't collide across components): Livewire's morph keys elements off
     * their id, so a fresh uniqid() on every render would swap the elements
     * on each update. Random ids are the last resort, for fields that never
     * morph.
     *
     * Memoized so the ids stay stable across the render lifecycle.
     *
     * @return array{labelId: string, descriptionId: string}
     */
    public function resolveIds(?string $wireKey = null): array
    {
        if ($this->resolvedIds === null) {
            $suffix = $wireKey ? '-' . $wireKey : '-' . uniqid();

            $this->resolvedIds = [
                'labelId' => $this->labelId ?: 'label' . $suffix,
                'descriptionId' => $this->descriptionId ?: 'description' . $suffix,
            ];
        }

        return $this->resolvedIds;
    }

    public function descriptionPosition($attributes): string
    {
        return $attributes->get('description:position', '');
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
            'labelId' => $this->labelId,
            'descriptionId' => $this->descriptionId,
        ] = $this->resolveIds($this->attributes->get('wire:key'));

        return $this;
    }

    public function render(): View
    {
        return view('wire-kit::components.field.index');
    }
}
