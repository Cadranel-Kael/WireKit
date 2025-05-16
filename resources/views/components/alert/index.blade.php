<div
    role="alert"
    {{
        $attributes->class([
            'border-base-200 flex w-full max-w-md items-start gap-4 rounded border px-4 py-3 text-sm',
            $variantClass,
        ])
    }}
>
    @if ($icon)
        <x-icon
            :name="$icon"
            class="shrink-0"
        />
    @endif

    <div class="flex flex-col gap-2">
        @if ($heading)
            <x-alert.heading>{{ $heading }}</x-alert.heading>
        @endif

        @if ($description)
            <x-alert.description>{{ $description }}</x-alert.description>
        @endif

        {{ $slot }}

        @if (! $inline)
            <div class="mt-1 flex gap-4">
                {{ $actions }}
            </div>
        @endif
    </div>
    @if ($inline)
        <div class="flex shrink-0 gap-4">
            {{ $actions }}
        </div>
    @endif

    @if ($controls)
        {{ $controls }}
    @endif
</div>
