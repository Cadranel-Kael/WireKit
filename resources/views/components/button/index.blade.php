@if ($link)
    <a
        href="{{ $link }}"
        @if ($loading)
            wire:loading.class="opacity-50"
        @endif
        {{
            $attributes->class([
                "block flex cursor-pointer items-center justify-center gap-2 rounded",
                $variantClass(),
                $sizeClass(),
            ])
        }}
    >
        @if ($icon)
            <x-icon name="{{ $icon }}" />
        @endif

        @if ($label)
            {{ $label }}
        @endif

        {{ $slot }}

        @if ($iconRight)
            <x-icon name="{{ $iconRight }}" />
        @endif
    </a>
@else
    <button
        @if ($loading)
            wire:loading.class="opacity-50"
        @endif
        {{
            $attributes
                ->class([
                    "flex cursor-pointer items-center justify-center gap-2 rounded",
                    $variantClass(),
                    $sizeClass(),
                ])
                ->merge(["type" => "button"])
        }}
    >
        @if ($icon)
            <x-icon name="{{ $icon }}" />
        @endif

        @if ($label)
            {{ $label }}
        @endif

        {{ $slot }}

        @if ($iconRight)
            <x-icon name="{{ $iconRight }}" />
        @endif
    </button>
@endif
