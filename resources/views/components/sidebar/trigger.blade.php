<wire:button
    :data-wire-sidebar-trigger="$for"
    :data-wire-sidebar-action="$action"
    aria-label="{{ $action === 'toggle' ? 'Toggle sidebar' : ucfirst($action).' sidebar' }}"
    {{ $attributes }}
>
    {{ $slot }}
</wire:button>
