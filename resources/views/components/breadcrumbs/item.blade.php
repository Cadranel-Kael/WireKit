<li {{ $attributes->class(["group flex items-center gap-1 text-sm font-medium last:text-gray-500"]) }}>
    @if ($href)
        <a
            @if (url()->current() === $href)
                aria-current="page"
            @endif
            href="{{ $href }}"
            class="hover:underline hover:underline-offset-3"
        >
            @if ($icon)
                <x-icon
                    class="hover:text-gray-500"
                    name="{{ $icon }}"
                />
            @else
                {{ $slot }}
            @endif
        </a>
    @else
        @if ($icon)
            <x-icon name="{{ $icon }}" />
        @else
            <div>
                {{ $slot }}
            </div>
        @endif
    @endif
    <x-icon
        class="text-gray-300 group-last:hidden"
        name="m-{{ $separator }}"
    />
</li>
