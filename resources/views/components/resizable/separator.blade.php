<div
    data-wire-resizable-separator
    {{ $attributes->class(['bg-border hover:bg-accent group relative mx-2 w-1 shrink-0 cursor-ew-resize rounded-full transition-colors']) }}
>
    <div
        class="bg-border group-hover:bg-accent absolute top-1/2 left-1/2 flex h-8 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors"
    >
        <wire:icon name="grip-vertical" size="3" class="text-muted-foreground" />
    </div>
</div>
