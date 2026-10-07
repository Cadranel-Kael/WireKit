@aware(["dropdownId"])
@php
    $isPopoverMenu = ($dropdownId && ! $id) || $attributes->has('popover');
@endphp
<div
    data-wire-menu
    tabindex="-1"
    @if ($dropdownId && ! $id)
        id="menu-{{ $dropdownId }}"
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
