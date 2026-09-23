<div {{ $attributes->class(['bg-muted flex aspect-square items-center justify-center overflow-clip', $roundedClass()]) }}>
    @if ($src)
        <img
            src="{{ $src }}"
            alt="{{ $alt }}"
            class="h-full w-full object-cover {{ $attributes->get('img:class', '') }}"
        />
    @else
        <div class="flex flex-col items-center gap-1 p-1">
            <wire:icon
                :name="$icon"
                :size="$attributes->get('icon:size', '')"
                class="text-muted-foreground"
            />
            @if ($extension)
                <span class="text-muted-foreground w-full truncate text-center text-[10px] uppercase">
                    {{ $extension }}
                </span>
            @endif
        </div>
    @endif
</div>
