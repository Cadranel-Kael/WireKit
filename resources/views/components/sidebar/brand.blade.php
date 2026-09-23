<a href="{{ $href }}" {{ $attributes->class('outline-none focus-visible:focus-ring rounded-xs flex gap-2 py-4') }}>
    @if ($logo)
        <img class="h-6 w-6" src="{{ $logo }}" alt="" />
    @endif

    <div @class(['font-medium', $attributes->get('name:class', '')])>{{ $slot ?? $name }}</div>
</a>
