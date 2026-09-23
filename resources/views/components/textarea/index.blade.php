@aware(['labelId', 'descriptionId', 'isInGroup' => false])
@php($labelId = $labelId ?: uniqid('label-'))
@php($descriptionId = $descriptionId ?: uniqid('description-'))

@if ($label || $description)
    <wire:field :$labelId :$descriptionId>
        <wire:label :class="$attributes->get('label:class', '')">
            {{ $label }}
        </wire:label>

        @if ($description && $attributes->get('description:position', '') !== 'after')
            <wire:description
                :class="$attributes->get('description:class', '')"
                :position="$attributes->get('description:position', 'before')"
            >
                {{ $description }}
            </wire:description>
        @endif

        @if ($description && $attributes->get('description:position', 'before') === 'after')
            <wire:description :class="$attributes->get('description:class', '')">
                {{ $description }}
            </wire:description>
        @endif

        <div
            @class(['rounded-auto-md relative col-span-full w-full max-w-sm', $attributes->get('container:class', '')])
            data-wire-input-container
        >
            <wire:textarea.textarea :disabled="$disabled" :id="$labelId" {{ $attributes }} />
        </div>
    </wire:field>
@else
    <div
        @class(['rounded-auto-md relative col-span-full w-full max-w-sm', $attributes->get('container:class', '')])
        data-wire-input-container
    >
        <wire:textarea.textarea :disabled="$disabled" :id="$labelId" {{ $attributes }} />
    </div>
@endif
