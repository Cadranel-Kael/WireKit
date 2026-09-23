<wire:dropdown>
    <wire:button
        size="xs"
        class="text-muted-foreground hover:bg-fill-active hover:text-foreground"
        variant="ghost"
        icon:right="chevron-down"
        aria-label="{{ __('Alignments') }}"
        data-richtext-style-trigger
    >
        @foreach ($alignments as $alignment)
            <wire:icon
                data-trigger-icon="{{ $resolveIcon($alignment) }}"
                name="{{ $resolveIcon($alignment) }}"
                size="4"
            />
        @endforeach
    </wire:button>
    <wire:menu>
        @foreach ($alignments as $alignment)
            <wire:menu.item
                data-command="align"
                data-align="{{ $alignment }}"
                data-icon="{{ $resolveIcon($alignment) }}"
                icon="{{ $resolveIcon($alignment) }}"
            >
                @lang(ucfirst($alignment))
            </wire:menu.item>
        @endforeach
    </wire:menu>
</wire:dropdown>
