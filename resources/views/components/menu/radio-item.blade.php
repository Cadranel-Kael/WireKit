<li role="none">
    <button
        {{ $attributes->class(['active:bg-muted group focus:bg-muted focus-visible:focus-ring flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-start text-sm outline-none']) }}
        data-wire-menu-item
        role="menuitemradio"
        aria-checked="{{ $active ? 'true' : 'false' }}"
        type="button"
    >
        <span class="border-input-border flex size-4 shrink-0 items-center justify-center rounded-full border shadow-xs">
            <span class="hidden size-2 rounded-full bg-black group-aria-checked:block"></span>
        </span>
        <span class="whitespace-nowrap">
            {{ $slot }}
        </span>
        @if ($shortcut)
            <div class="text-muted-foreground ml-auto">{{ $shortcut }}</div>
        @endif
    </button>
</li>
