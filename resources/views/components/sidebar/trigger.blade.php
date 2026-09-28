<wire:button
    :data-wire-sidebar-trigger="$for"
    :data-wire-sidebar-action="$action"
    aria-label="{{ $action === 'toggle' ? 'Toggle sidebar' : ucfirst($action) . ' sidebar' }}"
    {{ $attributes }}
>
    @if ($icon)
        <wire:icon :name="$icon" />
    @else
        <wire:icon name="menu" />
    @endif

    {{ $slot }}
</wire:button>
