<wire:editor.toolbar.dropdown label="Styles" default-icon="heading">
    <x-slot:icons>
        @foreach ($headings as $heading)
            <wire:icon
                data-trigger-icon="heading-{{ $heading }}"
                name="heading-{{ $heading }}"
                size="4"
                class="text-foreground"
            />
        @endforeach
    </x-slot>

    <wire:menu.item class="sr-only" data-command="heading" data-level="" data-icon="heading" icon="heading">
        @lang('Heading')
    </wire:menu.item>

    @foreach ($headings as $heading)
        <wire:menu.item
            data-command="heading"
            data-level="{{ $heading }}"
            data-icon="heading-{{ $heading }}"
            icon="heading-{{ $heading }}"
        >
            @lang('Heading ' . $heading)
        </wire:menu.item>
    @endforeach
</wire:editor.toolbar.dropdown>
