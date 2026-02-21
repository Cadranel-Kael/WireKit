<dialog
    id="{{ $name }}"
    data-wire-modal
    @if ($drawer)
        data-wire-position="{{ $position }}"
    @endif
    {{ $attributes->class(["bg-background rounded-radius border-border fixed inset-0 w-full border shadow-xs transition", "m-auto max-w-sm p-4" => ! $drawer, "p-8" => $drawer, $getPositionClasses() => $drawer]) }}
>
    <wire:button
        aria-label="close modal"
        data-wire-modal-close="{{ $name }}"
        icon="x-mark"
        icon:size="5"
        variant="ghost"
        size="sm"
        inset
        class="absolute right-4"
    />
    {{ $slot }}
</dialog>
