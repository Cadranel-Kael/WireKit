@if ($level)
    @if ($level === 1)
        <h1 {{ $attributes->class([$sizeClass, 'font-medium [&+*[data-wire-text]]:mt-2']) }}>
            {{ $slot }}
        </h1>
    @elseif ($level === 2)
        <h2 {{ $attributes->class([$sizeClass, 'font-medium [&+*[data-wire-text]]:mt-2']) }}>
            {{ $slot }}
        </h2>
    @elseif ($level === 3)
        <h3 {{ $attributes->class([$sizeClass, 'font-medium [&+*[data-wire-text]]:mt-2']) }}>
            {{ $slot }}
        </h3>
    @elseif ($level === 4)
        <h4 {{ $attributes->class([$sizeClass, 'font-medium [&+*[data-wire-text]]:mt-2']) }}>
            {{ $slot }}
        </h4>
    @elseif ($level === 5)
        <h5 {{ $attributes->class([$sizeClass, 'font-medium [&+*[data-wire-text]]:mt-2']) }}>
            {{ $slot }}
        </h5>
    @elseif ($level === 6)
        <h6 {{ $attributes->class([$sizeClass, 'font-medium [&+*[data-wire-text]]:mt-2']) }}>
            {{ $slot }}
        </h6>
    @endif
@else
    <div {{ $attributes->class([$sizeClass, 'font-medium [&+*[data-wire-text]]:mt-2']) }}>
        {{ $slot }}
    </div>
@endif
