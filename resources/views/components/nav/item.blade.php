<a
    href="{{ $href }}"
    data-wire-nav-item
    @if ($current)
        data-wire-active
    @endif
    @if ($icon)
        data-wire-has-icon
    @endif
    {{ $attributes->class("hover:bg-foreground/5 text-foreground/60 hover:text-foreground outline-none focus-visible:focus-ring peer data-wire-active:text-foreground data-wire-active:bg-foreground/5 relative my-0.5 flex w-full items-center rounded px-3 py-1.5 text-sm font-medium peer-data-[wire-has-icon]:pl-9 data-[wire-has-icon]:pl-9") }}
>
    @if ($icon)
        <!-- prettier-ignore-attribute -->
        <wire:icon
            :name="$icon"
            @class([$attributes->get("icon:class", ""), "absolute left-3"])
            :size="$attributes->get('icon:size', '4')"
        />
    @endif

    {{ $slot }}
</a>
