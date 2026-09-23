<li {{ $attributes->class(["group last:text-muted-foreground flex items-center gap-1 text-sm font-medium"]) }}>
    @if ($href || $as === "link")
        <a
            @if (url()->current() === $href)
                aria-current="page"
            @endif
            href="{{ $href }}"
            class="focus-visible:focus-ring rounded-xs outline-none hover:underline hover:underline-offset-3"
        >
            @if ($icon)
                <wire:icon class="hover:text-muted-foreground" name="{{ $icon }}" variant="{{ $iconVariant }}" />
            @else
                {{ $slot }}
            @endif
        </a>
    @elseif ($as === "button")
        <button
            type="button"
            class="focus-visible:focus-ring rounded-xs outline-none hover:underline hover:underline-offset-3"
        >
            @if ($icon)
                <wire:icon name="{{ $icon }}" />
            @else
                <div>
                    {{ $slot }}
                </div>
            @endif
        </button>
    @else
        @if ($icon)
            <wire:icon name="{{ $icon }}" />
        @else
            <div>
                {{ $slot }}
            </div>
        @endif
    @endif
    <wire:icon class="text-muted-foreground group-last:hidden" name="{{ $separator }}" variant="micro" />
</li>
