<div
    x-data="{
        open: false,
        getMetaKey() {
            return /mac/i.test(navigator.userAgent) ? '⌘' : 'Ctrl'
        },
    }"
    {{ $attributes }}
>
    <button
        @keydown.window.prevent.meta.k="open = ! open"
        @click="open = ! open"
        class="bg-muted text-muted-foreground outline-none focus-visible:focus-ring flex items-center gap-1 rounded-lg px-2 py-1 text-sm"
    >
        @if ($icon)
            <wire:icon class="!h-4 !w-4 shrink-0" name="search" variant="micro" />
        @endif

        <span x-text="getMetaKey">Ctrl</span>
        <span>K</span>
    </button>
    <template x-teleport="body">
        <div
            x-cloak
            x-show="open"
            @click.away="open = false"
            @keydown.escape="open = false"
            x-trap.inert.noscroll="open"
        >
            <div @click="open = false" class="absolute inset-0 z-30 backdrop-blur-sm"></div>
            <div
                class="border-border fixed top-24 left-1/2 z-30 w-full max-w-md -translate-x-1/2 rounded-lg border bg-card shadow-lg"
            >
                <input
                    class="border-border placeholder:font-inherit outline-none focus-visible:focus-ring w-full border-b p-4"
                    type="text"
                    placeholder="Search..."
                />
            </div>
        </div>
    </template>
</div>
