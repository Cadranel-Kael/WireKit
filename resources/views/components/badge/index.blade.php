@if ($as === 'button')
    <button
        {{
            $attributes
                ->class([
                    'flex w-fit items-center gap-1 font-medium',
                    $colorClass,
                    $sizeClass(),
                    $variantClass(),
                ])
                ->merge(['type' => 'button'])
        }}
    >
        @if ($icon)
            <x-icon :name="$icon" />
        @endif

        {{ $slot }}

        @if ($iconRight)
            <x-icon :name="$iconRight" />
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
            <x-icon :name="$icon" />
        @endif

        {{ $slot }}

        @if ($iconRight)
            <x-icon :name="$iconRight" />
        @endif
    </div>
@endif
