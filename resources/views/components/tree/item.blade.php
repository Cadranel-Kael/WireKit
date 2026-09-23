@aware(["variant", "sortable", "nested"])
@php
    // An empty `@if` block in the caller's slot content still compiles to
    // Livewire's morph-marker HTML comments, so a plain $slot->isEmpty()
    // check reports "has children" even when nothing renders in it.
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
            "bg-background border-background rounded-xl border px-4 py-2.5 shadow-sm first:mt-px" => $variant === "list",
            "dragging:border-primary dragging:bg-primary/50 dragging:*:opacity-0 dragging:border-dashed relative pr-2.5 pl-1.5" => $variant === "list" && $sortable === true,
            "opacity-50" => $disabled,
        ];
    @endphp

    @if ($href && ! $disabled)
        <div data-wire-tree-row tabindex="0" @class($rowClasses)>
            <a href="{{ $href }}" {{ $attributes->class("flex min-w-0 flex-1 items-center gap-1.5") }}>
                @if ($variant === "file")
                    @if ($sortable || $nested)
                        <wire:icon
                            data-wire-tree-handle
                            name="grip-vertical"
                            size="4"
                            class="text-muted-foreground group-dragging:cursor-grabbing shrink-0 cursor-grab"
                        />
                    @elseif ($hasChildren)
                        <button
                            type="button"
                            data-wire-tree-toggle
                            tabindex="-1"
                            class="text-muted-foreground flex h-4 w-4 shrink-0 items-center justify-center"
                            aria-hidden="true"
                        >
                            <wire:icon
                                name="chevron-right"
                                size="4"
                                class="transition-transform group-aria-expanded:rotate-90"
                            />
                        </button>
                    @else
                        <span class="h-4 w-4 shrink-0"></span>
                    @endif
                @endif

                @if ($icon)
                    <wire:icon name="{{ $icon }}" size="4" class="shrink-0" />
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
        <div data-wire-tree-row tabindex="{{ $disabled ? -1 : 0 }}" {{ $attributes->class($rowClasses) }}>
            @if ($variant === "file")
                @if ($sortable || $nested)
                    <wire:icon
                        data-wire-tree-handle
                        name="grip-vertical"
                        size="4"
                        class="text-muted-foreground group-dragging:cursor-grabbing shrink-0 cursor-grab"
                    />
                @elseif ($hasChildren)
                    <button
                        type="button"
                        data-wire-tree-toggle
                        tabindex="-1"
                        class="text-muted-foreground flex h-4 w-4 shrink-0 items-center justify-center"
                        aria-hidden="true"
                    >
                        <wire:icon
                            name="chevron-right"
                            size="4"
                            class="transition-transform group-aria-expanded:rotate-90"
                        />
                    </button>
                @else
                    <span class="h-4 w-4 shrink-0"></span>
                @endif
            @endif

            @if (($sortable || $nested) && $variant === "list")
                <wire:icon
                    data-wire-tree-handle
                    class="text-muted-foreground group-dragging:cursor-grabbing cursor-grab"
                    name="grip-vertical"
                />
            @endif

            @if ($icon)
                <wire:icon name="{{ $icon }}" size="4" class="shrink-0" />
            @endif

            <span class="truncate">{{ $label }}</span>

            @if ($hasChildren)
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
            @class(["ml-4 flex flex-col", "[&>*:first-child>*]:rounded-tl-none" => $variant === "list"])
        >
            {{ $slot }}
        </ul>
    @endif
</li>
