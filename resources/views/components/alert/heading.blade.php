<div
    {{ $attributes->class('flex items-center gap-2 text-sm font-medium') }}
    data-wire-alert-heading
>
    @if ($icon)
        <wire:icon
            :name="$icon"
            :variant="$attributes->get('icon:variant', '')"
            :size="$attributes->get('icon:size', '')"
            @class(['text-core-400', $attributes->get('icon:class', '')])
        />
    @endif

    {{ $slot }}
</div>
