@aware(['variant'])
<button
    type="button"
    data-wire-tab="{{ $name }}"
    role="tab"
    aria-controls="{{ $panelId }}"
    id="{{ $id }}"
    {{
        $attributes->class([
            'rounded-auto-sm data-active:text-foreground data-active:bg-background text-muted-foreground not-disabled:hover:text-foreground focus-visible:ring-ring inline-flex flex-1 items-center gap-1 px-4 py-1 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50',
            'relative data-active:after:content-[""] data-active:after:h-0.5 data-active:after:absolute data-active:after:inset-x-0 data-active:after:-bottom-1 data-active:after:bg-foreground' => $variant === 'line',
        ])
    }}
>
    @if ($icon)
        <wire:icon
            :name="$icon"
            :size="$attributes->get('icon:size', '4')"
            :variant="$attributes->get('icon:variant', 'solid')"
            @class(['shrink-0', $attributes->get('icon:class', '')])
        />
    @endif

    {{ $slot }}
</button>
