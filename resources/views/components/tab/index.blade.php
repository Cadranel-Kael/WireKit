@aware(['groupId'])
<button
    type="button"
    data-wire-tab="{{ $name }}"
    role="tab"
    aria-controls="panel-{{ $name }}-{{ $groupId }}"
    id="tab-{{ $name }}-{{ $groupId }}"
    {{
        $attributes->class([
            'text-muted-foreground hover:text-foreground active:bg-background active:text-foreground outline-none focus-visible:focus-ring rounded-md px-2 py-1 text-sm transition-colors active:shadow-xs',
        ])
    }}
>
    @if ($icon)
        <wire:icon name="{{ $icon }}" class="{{ $attributes->whereStartsWith('icon:class') }}" />
    @endif

    {{ $slot }}
</button>
