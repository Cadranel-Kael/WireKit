@if ($as === 'button')
    <button
        {{
            $attributes
                ->class([
                    'flex w-fit items-center gap-1 font-medium outline-none focus-visible:focus-ring',
                    $colorClass,
                    $sizeClass(),
                    $variantClass(),
                ])
                ->merge(['type' => 'button'])
        }}
    >
        @if ($icon)
            <wire:icon
                :name="$icon"
                :variant="$attributes->get('icon:variant', '')"
                :size="$attributes->get('icon:size', '')"
            />
        @endif

        {{ $slot }}

        @if ($attributes->get('icon:right', ''))
            <wire:icon
                :name="$attributes->get('icon:right', '')"
                :variant="$attributes->get('icon:variant', '')"
                :size="$attributes->get('icon:size', '')"
            />
        @endif
    </button>
@else
    <div
        {{
            $attributes->class([
                'flex w-fit items-center gap-1 font-medium',
                $colorClass,
                $sizeClass(),
                $variantClass(),
            ])
        }}
    >
        @if ($icon)
            <wire:icon
                :name="$icon"
                :variant="$attributes->get('icon:variant', '')"
                :size="$attributes->get('icon:size', '')"
            />
        @endif

        {{ $slot }}

        @if ($attributes->get('icon:right', ''))
            <wire:icon
                :name="$attributes->get('icon:right', '')"
                :variant="$attributes->get('icon:variant', '')"
                :size="$attributes->get('icon:size', '')"
            />
        @endif
    </div>
@endif
