@aware(["dropdownId"])
<button
    data-wire-button
    data-wire-field
    @if ($loading)
        wire:loading.class="opacity-50"
    @endif
    @if ($dropdownId)
        id="trigger-{{ $dropdownId }}"
        popovertarget="menu-{{ $dropdownId }}"
        popovertargetaction="toggle"
    @endif
    {{
        $attributes
            ->class([
                "outline-none focus-visible:focus-ring flex cursor-pointer disabled:cursor-not-allowed group-[.input-group]:first:rounded-e-none group-[.input-group]:last:rounded-s-none items-center justify-center gap-2 peer whitespace-nowrap not-group-[.button-group]:rounded-md text-sm ",
                "aspect-square p-0!" => $square || $slot->isEmpty(),
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
