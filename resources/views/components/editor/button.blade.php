<wire:tooltip content="{{ $label }}">
    <wire:toggle
        {{ $attributes->class('text-muted-foreground active:text-black') }}
        size="sm"
    >
        <wire:icon name="{{ $icon }}" size="4" />
        {{ $slot }}
    </wire:toggle>
</wire:tooltip>
