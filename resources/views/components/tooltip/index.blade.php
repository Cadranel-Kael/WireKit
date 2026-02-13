<div class="relative inline-block" data-wire-tooltip @if($delay) data-wire-delay="{{ $delay }}" @endif>
    <div
        @class(['absolute z-10', $getPlacementClass, $attributes->get('content-container:class')])
        data-wire-tooltip-content
    >
        <div
            {{ $attributes->class(['rounded-radius bg-foreground text-background relative px-3 py-1.5 text-xs whitespace-nowrap shadow-lg']) }}
            role="tooltip"
            id="{{ $tooltip }}"
        >
            {{ $content }}
            @if (! $arrowless)
                <div
                    @class(['text-foreground absolute border-5 border-transparent', $getArrowPlacementClass, $attributes->get('arrow:class')])
                ></div>
            @endif
        </div>
    </div>
    {{ $slot }}
</div>
