<dialog
    id="{{ $name }}"
    data-wire-modal
    @if ($drawer)
        data-wire-position="{{ $position }}"
    @endif
    inert
    loading
    wire:ignore
    {{ $attributes->class(["bg-background rounded-auto-md border-border loading:hidden loading:opacity-0 not-open:not-closing:opacity-0 fixed inset-0 z-90 block w-full border shadow-xs not-open:pointer-events-none backdrop:backdrop-blur-sm", "closing:animate-pop-out open:animate-pop-in m-auto max-w-sm p-4" => ! $drawer, "p-8" => $drawer, $getPositionClasses() => $drawer]) }}
>
    {{ $slot }}
    <wire:button
        aria-label="close modal"
        data-wire-modal-close="{{ $name }}"
        icon="x"
        icon:size="5"
        variant="ghost"
        size="sm"
        inset
        class="absolute top-4 right-4"
    />
</dialog>
