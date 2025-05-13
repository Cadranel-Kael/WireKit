<li role="presentation">

    <a
        role="menuitem"
        class="flex items-center my-0.5 gap-2 text-sm p-2 rounded bg-base-100 hover:bg-base-content/10 {{ url()->full() === $link ? 'bg-base-content/10' : '' }}"
        href="{{ $link }}"
        wire:navigate
    >
        <div class="w-full flex items-center gap-2">
            @if($icon)
                <x-dynamic-component :component="'heroicon-'. $icon" class="w-6 h-6" />
            @endif
            {{ $slot }}
        </div>
        @if($attributes->get('badge'))
            <x-badge variant="{{ $attributes->get('badge-variant') }}">
                {{ $attributes->get('badge') }}
            </x-badge>
        @endif
    </a>
</li>
