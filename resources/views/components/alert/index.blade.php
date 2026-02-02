<div
    data-wire-alert
    role="alert"
    {{
        $attributes->class([
            'border-core-200 flex w-full max-w-md gap-4 rounded-xl border px-4 py-3 text-sm',
            'items-start' => ! $inline,
            'items-center' => $inline,
            $colorClass,
        ])
    }}
>
    @if ($icon)
        <wire:icon
            :name="$icon"
            :variant="$attributes->get('icon:variant', '')"
            :size="$attributes->get('icon:size', '')"
            @class(['text-core-400 mt-0.5 shrink-0', $attributes->get('icon:class', '')])
        />
    @endif

    <div class="flex flex-col gap-2">
        @if ($heading)
            <wire:alert.heading :class="$attributes->get('heading:class', '')">{{ $heading }}</wire:alert.heading>
        @endif

        @if ($description)
            <wire:alert.description :class="$attributes->get('description:class', '')">
                {{ $description }}
            </wire:alert.description>
        @endif

        {{ $slot }}

        @if (! $inline && $actions)
            <div @class(['mt-1 flex gap-4', $attributes->get('actions:class', '')])>
                {{ $actions }}
            </div>
        @endif
    </div>
    @if ($inline && $actions)
        <div @class(['flex shrink-0 gap-4', $attributes->get('actions:class', '')])>
            {{ $actions }}
        </div>
    @endif

    @if ($controls)
        {{ $controls }}
    @endif
</div>
