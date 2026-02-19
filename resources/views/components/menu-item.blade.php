<li role="presentation">
    <a
        role="menuitem"
        class="bg-base-100 hover:bg-base-content/10 {{ url()->full() === $link ? 'bg-base-content/10' : '' }} my-0.5 flex items-center gap-2 rounded p-2 text-sm"
        href="{{ $link }}"
        wire:navigate
    >
        <div class="flex w-full items-center gap-2">
            @if ($icon)
                <x-dynamic-component :component="'heroicon-'. $icon" class="h-6 w-6" />
            @endif

            {{ $slot }}
        </div>
        @if ($attributes->get('badge'))
            <wire:badge variant="{{ $attributes->get('badge-variant') }}">
                {{ $attributes->get('badge') }}
            </wire:badge>
        @endif
    </a>
</li>
