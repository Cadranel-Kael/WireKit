@aware(["groupId" => "", "exclusive" => false])
<button
    type="button"
    @if ($groupId)
        data-wire-group="{{ $groupId }}"
        data-wire-exclusive="@js($exclusive)"
    @endif
    data-wire-toggle
    data-wire-active="@js($active)"
    aria-pressed="@js($active)"
    {{ $attributes->class(["hover:bg-muted group/toggle data-[state=on]:bg-muted rounded-radius flex items-center justify-center group-data-[wire-toggle-group]:rounded-none", $sizeClasses, $variantClasses]) }}
>
    @if ($icon)
        <wire:icon
            :name="$icon"
            :variant="$attributes->get('icon:variant', '')"
            @class(["group-data-[state=on]/toggle:data-[wire-variant=o]:fill-inherit", $attributes->get("icon:class", "")])
            :size="$attributes->get('icon:size', $iconSize)"
        />
    @endif

    {{ $slot }}
    @if ($attributes->get("icon:right", ""))
        <wire:icon
            :name="$icon ? $icon : $attributes->get('icon:right', '')"
            :variant="$attributes->get('icon:variant', '')"
            :class="$attributes->get('icon:class', 'group-data-[wire-active]:fill-inherit')"
            :size="$attributes->get('icon:size', '')"
        />
    @endif
</button>
