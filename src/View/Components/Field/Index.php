<?php

namespace WireKit\View\Components\Field;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
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
     * @return array{labelId: string, descriptionId: string}
     */
    public function resolveIds(?string $wireKey = null): array
    {
        $suffix = $wireKey ? '-' . $wireKey : '-' . uniqid();

        return [
            'labelId' => $this->labelId ?: 'label' . $suffix,
            'descriptionId' => $this->descriptionId ?: 'description' . $suffix,
        ];
    }

    public function descriptionPosition($attributes): string
    {
        return $attributes->get('description:position', '');
    }

    public function render(): View
    {
        [
            'labelId' => $this->labelId,
            'descriptionId' => $this->descriptionId,
        ] = $this->resolveIds($this->attributes->get('wire:key'));

        return view('wire-kit::components.field.index');
    }
}
