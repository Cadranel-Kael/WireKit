<span
    {{ $attributes->merge(['class' => 'px-2 rounded-full inline-flex items-center text-sm gap-1 ' . $variantClass()]) }}
>
    {{ $slot }}
    @if($icon)
        <x-dynamic-component :component="'heroicon-' . $icon" class="w-4 h-4" />
    @endif
</span>
