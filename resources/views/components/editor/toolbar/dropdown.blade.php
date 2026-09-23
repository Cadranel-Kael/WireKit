@props([
    'label',
    'defaultIcon' => null,
])

<wire:dropdown>
    <wire:button
        size="xs"
        class="text-muted-foreground hover:bg-fill-active hover:text-foreground"
        variant="ghost"
        icon:right="chevron-down"
        :aria-label="$label"
    >
        @if ($defaultIcon)
            <wire:icon :data-trigger-icon="$defaultIcon" :name="$defaultIcon" size="4" />
        @endif

        {{ $icons ?? '' }}
    </wire:button>
    <wire:menu>
        {{ $slot }}
    </wire:menu>
</wire:dropdown>
