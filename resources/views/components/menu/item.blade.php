<button
    {{ $attributes->class(['data-active:bg-core-100 dark:data-active:bg-core-600 group focus:bg-core-100 flex w-full gap-2 rounded px-2.5 py-1.5 text-start text-sm focus:outline-none']) }}
    role="menuitem"
    data-wire-menu-item
>
    <div class="hidden w-7 [[data-wire-menu]:has(>[data-wire-menu-item-has-icon])_&]:block">
        @if ($icon)
            <wire:icon name="{{ $icon }}" />
        @endif
    </div>
    {{ $slot }}
    @if ($shortcut)
        <div class="text-muted-foreground ml-auto">{{ $shortcut }}</div>
    @endif
</button>
