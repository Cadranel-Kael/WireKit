@aware(['labelId', 'descriptionId', 'isInGroup' => false])
@php($labelId = $labelId ?: uniqid('label-'))
@php($descriptionId = $descriptionId ?: uniqid('description-'))
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
