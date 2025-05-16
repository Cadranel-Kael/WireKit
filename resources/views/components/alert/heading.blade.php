<div {{ $attributes->class('flex gap-2 text-sm font-medium') }}>
    @if ($icon)
        <x-icon :name="$icon" />
    @endif

    {{ $slot }}
</div>
