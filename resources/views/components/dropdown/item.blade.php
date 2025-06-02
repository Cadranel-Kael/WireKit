<li role="menuitem">
    @if ($href)
        <a
            data-wire-item="{{ $id }}"
            {{ $attributes->class(['data-active:bg-core-100 group flex w-full gap-2 rounded px-2.5 py-1.5 text-start text-sm font-medium focus:outline-none']) }}
            href="{{ $href }}"
            tabindex="-1"
            data-wire-state=""
        >
            <div>
                @if ($icon)
                    <x-icon
                        class="group-data-active:text-core-900 text-core-500"
                        name="{{ $icon }}"
                    ></x-icon>
                @endif
            </div>

            {{ $slot }}
        </a>
    @else
        <button
            x-on:mouseenter="goTo"
            x-on:mouseleave="resetItems"
            data-wire-item="{{ $id }}"
            {{ $attributes->class(['data-active:bg-core-100 group flex w-full gap-2 rounded px-2.5 py-1.5 text-start text-sm font-medium focus:outline-none']) }}
            tabindex="-1"
            data-wire-state=""
        >
            @if ($icon)
                <x-icon
                    class="group-data-active:text-core-900 text-core-500"
                    name="{{ $icon }}"
                ></x-icon>
            @else
                <div class=""></div>
            @endif

            {{ $slot }}
        </button>
    @endif
</li>
