@aware(["dropdownId"])
<div
    data-wire-menu
    tabindex="-1"
    @if ($dropdownId && ! $id)
        id="menu-{{ $dropdownId }}"
        anchor="trigger-{{ $dropdownId }}"
        popover
    @endif
    @if ($id)
        id="{{ $id }}"
    @endif
    {{ $attributes->class(["border-border bg-background outline-none focus-visible:focus-ring rounded-lg border p-2 text-sm shadow-sm [position-anchor:auto] [position-area:bottom_span-left]"]) }}
>
    <ul role="menu">
        {{ $slot }}
    </ul>
</div>
