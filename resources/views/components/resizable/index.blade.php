<div
    data-wire-resizable
    data-orientation="{{ $orientation }}"
    {{ $attributes->class(['flex', 'flex-row' => $orientation === 'horizontal', 'flex-col' => $orientation === 'vertical']) }}
>
    {{ $slot }}
</div>
