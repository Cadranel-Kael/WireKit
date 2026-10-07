@aware(["variant", "sortable", "nested"])
@php
    $hasChildren = trim(preg_replace("/<!--\[if (END)?BLOCK\]><!\[endif\]-->/", "", (string) $slot)) !== "";
    $hasActions = isset($actions) && trim(preg_replace("/<!--\[if (END)?BLOCK\]><!\[endif\]-->/", "", (string) $actions)) !== "";
@endphp

<li
    role="treeitem"
    data-wire-tree-item
    data-wire-expanded="@js($expanded)"
    id="{{ $id }}"
    @if ($hasChildren)
        aria-expanded="@js($expanded)"
    @endif
    @if ($disabled)
        aria-disabled="true"
    @endif
>
    @php
        $rowClasses = [
            "group dragging:cursor-grabbing focus-visible:focus-ring flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-start outline-none",
            $rowClass($variant, $sortable),
            "opacity-50" => $disabled,
        ];
    @endphp

    @if ($href && ! $disabled)
        <div
            data-wire-tree-row
            tabindex="0"
            @if ($hasChildren)
                aria-expanded="@js($expanded)"
            @endif
            @unless ($draggable)
                data-wire-tree-no-drag
            @endunless
            @class($rowClasses)
        >
            <a href="{{ $href }}" {{ $attributes->class("flex min-w-0 flex-1 items-center gap-1.5") }}>
                @if ($variant === "file")
                    <button
                        type="button"
                        data-wire-tree-toggle
                        tabindex="-1"
                        class="text-muted-foreground flex h-4 w-4 shrink-0 items-center justify-center"
                        aria-hidden="true"
                    >
                        <wire:icon name="chevron-right" size="4" class="transition-transform" />
                    </button>
                @endif

                @if ($icon)
                    <wire:icon name="{{ $icon }}" size="4" class="shrink-0" />
                    @if ($attributes->get("open:icon", ""))
                        <wire:icon
                            :name="$attributes->get('open:icon', '')"
                            size="4"
                            class="shrink-0 group-aria-expanded:hidden"
                        />
                    @endif
                @endif

                <span class="truncate">{{ $label }}</span>
            </a>

            @if ($hasActions)
                <wire:dropdown class="ml-auto shrink-0">
                    <wire:button variant="ghost" size="xs" inset icon="ellipsis" :tooltip="__('Actions')" />
                    <wire:menu>
                        {{ $actions }}
                    </wire:menu>
                </wire:dropdown>
            @endif
        </div>
    @else
        <div
            data-wire-tree-row
            tabindex="{{ $disabled ? -1 : 0 }}"
            @if ($hasChildren)
                aria-expanded="@js($expanded)"
            @endif
            @unless ($draggable)
                data-wire-tree-no-drag
            @endunless
            {{ $attributes->class($rowClasses) }}
        >
            @if ($variant === "file")
                <button
                    type="button"
                    data-wire-tree-toggle
                    tabindex="-1"
                    class="text-muted-foreground flex h-4 w-4 shrink-0 items-center justify-center"
                    aria-hidden="true"
                >
                    <wire:icon name="chevron-right" size="4" class="transition-transform" />
                </button>
            @endif

            @if (($sortable || $nested) && $variant === "list" && $draggable)
                <wire:icon
                    data-wire-tree-handle
                    class="text-muted-foreground group-dragging:cursor-grabbing cursor-grab"
                    name="grip-vertical"
                />
            @endif

            @if ($icon)
                <wire:icon
                    name="{{ $icon }}"
                    size="4"
                    @class(["shrink-0", "group-aria-expanded:hidden" => $attributes->get("open:icon", "")])
                />
                @if ($attributes->get("open:icon", ""))
                    <wire:icon
                        :name="$attributes->get('open:icon', '')"
                        size="4"
                        class="hidden shrink-0 group-aria-expanded:block"
                    />
                @endif
            @endif

            <span class="truncate">{{ $label }}</span>

            @if ($variant === "list")
                <wire:button data-wire-tree-toggle icon="chevron-down" variant="ghost" size="xs" inset class="ml-1" />
            @endif

            @if ($hasActions)
                <wire:dropdown class="ml-auto shrink-0">
                    <wire:button variant="ghost" size="xs" inset icon="ellipsis" :tooltip="__('Actions')" />
                    <wire:menu>
                        {{ $actions }}
                    </wire:menu>
                </wire:dropdown>
            @endif
        </div>
    @endif

    @if ($hasChildren)
        <ul
            role="group"
            data-wire-tree-group
            @class(["flex flex-col", $groupClass($variant)])
        >
            {{ $slot }}
        </ul>
    @endif
</li>
