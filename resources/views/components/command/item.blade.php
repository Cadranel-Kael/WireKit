<div {{ $attributes->class('mx-2') }}>
    <button
        type="button"
        class="hover:bg-muted outline-none focus-visible:focus-ring flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm"
    >
        <div class="flex items-center gap-2">
            <div class="size-4">
                @if ($icon)
                    <wire:icon
                        :name="$icon"
                        :variant="$attributes->get('icon:variant', 'outline')"
                        @class(['!size-4', $attributes->get('icon:class')])
                    />
                @endif
            </div>
            <span data-wire-command>
                {{ $slot }}
            </span>
        </div>
        @if ($kbd)
            <div class="bg-muted text-muted-foreground rounded-sm px-1 py-0.5 text-xs">
                {{ $kbd }}
            </div>
        @endif
    </button>
</div>
