@aware(["inGroup" => false, "tooltip" => false])
@if ($href || $as === "a")
    <a
        @if ($tooltip)
            data-wire-tooltip
            aria-describedby="{{ $tooltip }}"
            data-wire-tooltip-trigger
        @endif
        data-wire-button
        data-wire-field
        href="{{ $href }}"
        @if ($loading)
            wire:loading.class="opacity-50"
        @endif
        {{
            $attributes->class([
                "outline-none focus-visible:focus-ring group/button block flex cursor-not-allowed items-center justify-center gap-2 rounded-lg text-sm shadow-xs disabled:cursor-not-allowed",
                "aspect-square" => $square || $slot->isEmpty(),
                $variantClass() => ! $color,
                $sizeClass(),
                $colorClass,
            ])
        }}
    >
        @if ($icon && $attributes->get("icon:right", "") === "")
            <wire:icon
                :size="$attributes->get('icon:size', '4')"
                :variant="$attributes->get('icon:variant', 'solid')"
                @class(["shrink-0", $attributes->get("icon:class", "")])
                :name="$icon"
            />
        @endif

        @if ($label)
            {{ $label }}
        @endif

        {{ $slot }}

        @if ($attributes->get("icon:right", "") !== "")
            @php
                if (! $icon) {
                    $icon = $attributes->get("icon:right");
                }
            @endphp

            <wire:icon
                :size="$attributes->get('icon:size', '4')"
                :variant="$attributes->get('icon:variant', 'solid')"
                @class(["shrink-0", $attributes->get("icon:class", "")])
                :name="$icon"
            />
        @endif

        @if ($tooltip)
            <div data-wire-tooltip-content>{{ $tooltip }}</div>
        @endif
    </a>
@else
    @if ($tooltip)
        <wire:tooltip content="{{ $tooltip }}">
            <wire:button.button :$icon {{ $attributes->class([$variantClass(), $sizeClass(), $colorClass]) }}>
                {{ $slot }}
            </wire:button.button>
        </wire:tooltip>
    @else
        <wire:button.button :$icon {{ $attributes->class([$variantClass(), $sizeClass(), $colorClass]) }}>
            {{ $slot }}
        </wire:button.button>
    @endif
@endif
