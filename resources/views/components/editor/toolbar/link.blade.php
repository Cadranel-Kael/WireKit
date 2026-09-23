<wire:dropdown>
    <wire:button
        size="xs"
        class="text-muted-foreground hover:bg-fill-active hover:text-foreground"
        variant="ghost"
        aria-label="Styles"
        data-command="link"
    >
        <wire:icon name="link" size="4" />
    </wire:button>
    <wire:menu class="p-0!">
        <wire:menu.item class="flex items-center pr-3">
             <input data-richtext-link-input type="text" class="outline-none focus-visible:focus-ring py-3 pl-3" placeholder="@lang('https://')">
            {{-- <wire:button data-richtext-link-confirm size="sm" tooltip="Link" icon="check" variant="ghost" /> --}}
{{--            <wire:button data-richtext-link-unlink size="sm" tooltip="Unlink" icon="unlink" variant="ghost" />--}}
        </wire:menu.item>
    </wire:menu>
</wire:dropdown>
