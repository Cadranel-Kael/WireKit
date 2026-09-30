<div {{ $attributes->class('my-16 flex w-full flex-col items-center gap-4 text-sm') }}>
    @if ($icon || $title || $description)
        <wire:empty.header>
            @if ($icon)
                <wire:empty.icon :name="$icon" />
            @endif

            @if ($title)
                <wire:empty.title>
                    {{ $title }}
                </wire:empty.title>
            @endif

            @if ($description)
                <wire:empty.description>
                    {{ $description }}
                </wire:empty.description>
            @endif
        </wire:empty.header>
        {{ $slot }}
    @else
        {{ $slot }}
    @endif
</div>
