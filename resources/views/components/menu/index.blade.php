@aware(["resolveDropdownId"])
@php
    $isPopoverMenu = ($resolveDropdownId && ! $id) || $attributes->has('popover');
@endphp
<div
    data-wire-menu
    tabindex="-1"
    @if ($resolveDropdownId && ! $id)
        id="menu-{{ $resolveDropdownId() }}"
        popover
    @endif
    @if ($id)
        id="{{ $id }}"
    @endif
    @if ($isPopoverMenu)
        data-wire-placement="{{ $placement }}"
    @endif
    {{
        $attributes->class([
            "border-border bg-background outline-none focus-visible:focus-ring rounded-lg border p-2 text-sm shadow-sm",
            "fixed inset-auto m-0" => $isPopoverMenu,
        ])
    }}
>
    <ul role="menu">
        {{ $slot }}
    </ul>
</div>
