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
    {{ $attributes->class(["hover:bg-fill-active group/toggle active:bg-fill-active outline-none focus-visible:focus-ring flex items-center justify-center rounded-sm group-data-[wire-toggle-group]:rounded-none", $sizeClasses, $variantClasses]) }}
>
    @if ($icon)
        <wire:icon
            :name="$icon"
            :variant="$attributes->get('icon:variant', '')"
            @class(["group-active/toggle:data-[wire-variant=o]:fill-inherit", $attributes->get("icon:class", "")])
            :size="$attributes->get('icon:size', $iconSize)"
        />
    @endif

    {{ $slot }}

    @if ($attributes->get("icon:right", ""))
        <wire:icon
            :name="$icon ? $icon : $attributes->get('icon:right', '')"
            :variant="$attributes->get('icon:variant', '')"
            :class="$attributes->get('icon:class', 'group-active:fill-inherit')"
            :size="$attributes->get('icon:size', '')"
        />
    @endif
</button>
