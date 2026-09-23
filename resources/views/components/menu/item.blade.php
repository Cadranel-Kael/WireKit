<li role="menuitem">
    @if ($href)
        <a
            {{ $attributes->class(['group focus:bg-muted hover:bg-muted focus-visible:focus-ring flex w-full gap-2 rounded px-2.5 py-1.5 text-start text-sm outline-none']) }}
            data-wire-menu-item
            href="{{ $href }}"
        >
            {{-- <div class="w-6 [[data-wire-menu]:has(>[data-wire-menu-item-has-icon])_&]:block"> --}}
            {{-- @if ($icon) --}}
            {{-- <wire:icon size="4" name="{{ $icon }}" /> --}}
            {{-- @endif --}}
            {{-- </div> --}}
            <span class="whitespace-nowrap">
                {{ $slot }}
            </span>
            @if ($shortcut)
                <div class="text-muted-foreground ml-auto">{{ $shortcut }}</div>
            @endif
        </a>
    @else
        <button
            {{ $attributes->class(['active:bg-muted group focus:bg-muted focus-visible:focus-ring flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-start text-sm outline-none']) }}
            data-wire-menu-item
            type="button"
        >
            <div class="w-6 [[data-wire-menu]:has(>[data-wire-menu-item-has-icon])_&]:block">
                @if ($icon)
                    <wire:icon class="size-4" name="{{ $icon }}" />
                @endif
            </div>
            <span class="whitespace-nowrap">
                {{ $slot }}
            </span>
            @if ($shortcut)
                <div class="text-muted-foreground ml-auto">{{ $shortcut }}</div>
            @endif
        </button>
    @endif
</li>
