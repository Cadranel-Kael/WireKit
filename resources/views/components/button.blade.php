@if($link)
    <a href="{{ $link }}"
@else
    <button
        type="{{ $type }}"
        @if($loading)
            wire:loading.class="opacity-50"
        @endif
        @endif
        {{
            $attributes->class(
                'btn'
            )
        }}
    >
        {{ $slot }}
        @if($label)
            {{ $label }}
        @endif
        @if($link)
            </a>
        @else
    </button>
@endif
