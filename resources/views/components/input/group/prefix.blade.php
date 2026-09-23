@aware(["isInGroup" => false])
<div
    @if ($isInGroup)
        data-wire-input-group
    @endif
    {{ $attributes->class("border-input-border bg-muted text-foreground flex items-center rounded-s-lg border px-4 text-sm shadow-xs") }}
>
    {{ $slot }}
</div>
