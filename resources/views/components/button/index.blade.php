@aware(["inGroup" => false])
@if ($href || $as === "a")
    <a
        @if ($tooltip)
            x-data="{ tooltip: '{{ $tooltip }}' }"

            @if ($attributes->get("tooltip:placement", "") !== "")
                x-tooltip.arrowless.placement.{{ $attributes->get("tooltip:placement", "") }}="tooltip"
            @else
                x-tooltip.arrowless="tooltip"
            @endif
        @endif
        data-wire-button
        href="{{ $href }}"
        @if ($loading)
            wire:loading.class="opacity-50"
        @endif
        {{
            $attributes->class([
                "group/button rounded-base focus-visible:ring-ring/50 block flex items-center justify-center gap-2 text-sm outline-none focus-visible:ring-4",
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
    </a>
@else
    <button
        @if ($tooltip)
            x-data="{ tooltip: '{{ $tooltip }}' }"

            @if ($attributes->get("tooltip:placement", "") !== "")
                x-tooltip.arrowless.placement.{{ $attributes->get("tooltip:placement", "") }}="tooltip"
            @else
                x-tooltip.arrowless="tooltip"
            @endif
        @endif
        data-wire-button
        @if ($loading)
            wire:loading.class="opacity-50"
        @endif
        {{
            $attributes
                ->class([
                    "flex group/button  items-center justify-center gap-2 peer whitespace-nowrap not-group-[.button-group]:rounded-lg text-sm ",
                    "aspect-square" => $square || $slot->isEmpty(),
                    $variantClass() => ! $color,
                    $sizeClass(),
                    $colorClass,
                ])
                ->merge(["type" => "button"])
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
    </button>
@endif
