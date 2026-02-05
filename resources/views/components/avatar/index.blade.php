<div
    data-wire-avatar
    {{ $attributes->class(['relative flex items-center justify-center overflow-clip text-sm shadow', $sizeClass, $colorClass, 'rounded' => ! $circle, 'rounded-full' => $circle]) }}
>
    @if ($src)
        <img src="{{ $src }}" alt="{{ $name }}" />
    @elseif ($initials)
        {{ $initials }}
    @elseif ($icon)
        <wire:icon
            :name="$icon"
            :variant="$attributes->get('icon:variant', '')"
            :size="$attributes->get('icon:size', '')"
            :class="$attributes->get('icon:class', '')"
        />
    @elseif ($slot->isNotEmpty())
        {{ $slot }}
    @else
        {{ getInitials($name) }}
    @endif
    @if ($badge)
        <div
            @class([
                'absolute flex h-3.5 w-3.5 items-center justify-center overflow-clip text-xs ring-[2px] ring-white',
                $badgeVariantClass($attributes),
                $badgeColorClass($attributes),
                $badgePositionClass($attributes),
                'rounded' => ! $attributes->get('badge:circle', false),
                'rounded-full' => $attributes->get('badge:circle', false),
            ])
        >
            {{ $badge }}
        </div>
    @endif
</div>
