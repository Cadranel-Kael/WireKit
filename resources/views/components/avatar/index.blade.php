<div
    {{ $attributes->class(['relative flex items-center justify-center text-sm shadow', $sizeClass, $colorClass, 'rounded' => ! $circle, 'rounded-full' => $circle]) }}
>
    @if ($src)
        <img
            src="{{ $src }}"
            alt="{{ $name }}"
        />
    @elseif ($initials)
        {{ $initials }}
    @elseif ($icon)
        <x-icon name="{{ $icon }}"></x-icon>
    @else
        {{ getInitials($name) }}
    @endif
    @if ($badge)
        <div
            @class([
                'absolute flex h-3.5 w-3.5 items-center justify-center ring-[2px] ring-white',
                $badgeColorClass,
                $badgePositionClass,
                'rounded' => ! $badgeCircle,
                'rounded-full' => $badgeCircle,
                $badgeVariantClass,
            ])
        >
            {{ $badge }}
        </div>
    @endif
</div>
