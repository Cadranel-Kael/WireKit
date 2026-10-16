@aware(['labelId', 'descriptionId', 'isInGroup' => false])
@php
    // Checkboxes in a group share one wire:model and differ only by value,
    // so the value must be part of the key to keep ids unique.
    $wireModel = $attributes->wire('model')->value();
    $fieldKey = $attributes->get('wire:key')
        ?: ($wireModel ? $wireModel . ':' . $attributes->get('value', '') : null)
        ?: $attributes->get('name')
        ?: $attributes->get('id');
@endphp
@php($labelId = $labelId ?: ($fieldKey ? 'label-' . md5((string) $fieldKey . '-label') : uniqid('label-')))
@php($descriptionId = $descriptionId ?: ($fieldKey ? 'description-' . md5((string) $fieldKey . '-description') : uniqid('description-')))
@if ($label || $description)
    <wire:field :description:position="$descriptionPosition($attributes)" :$labelId :$descriptionId display="inline">
        <div @class([$attributes->get('class'), 'relative flex items-center'])>
            <input
                {{ $attributes->except('class') }}
                class="peer border-input-border outline-none focus-visible:focus-ring h-4 w-4 shrink-0 appearance-none rounded-sm border bg-white shadow-xs checked:border-0 checked:bg-black"
                type="checkbox"
                id="{{ $labelId }}"
            />
            <svg
                class="pointer-events-none absolute hidden h-4 w-4 text-white peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                    clip-rule="evenodd"
                ></path>
            </svg>
        </div>
        @if ($label)
            <wire:label class="{{ $labelClasses($attributes) }}">{{ $label }}</wire:label>
        @endif

        @if ($description)
            <wire:description class="{{ $descriptionClasses($attributes) }}">{{ $description }}</wire:description>
        @endif
    </wire:field>
@else
    <div @class([$attributes->get('class'), 'relative flex items-center'])>
        <input
            {{ $attributes->except('class') }}
            class="peer border-input-border outline-none focus-visible:focus-ring h-4 w-4 shrink-0 appearance-none rounded-sm border bg-white shadow-xs checked:border-0 checked:bg-black"
            type="checkbox"
            id="{{ $labelId }}"
        />
        <svg
            class="pointer-events-none absolute hidden h-4 w-4 text-white peer-checked:block"
            data-flux-icon=""
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
        >
            <path
                fill-rule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                clip-rule="evenodd"
            ></path>
        </svg>
    </div>
@endif
