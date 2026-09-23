@if ($clearable)
    <button
        data-wire-input-clear
        type="button"
        class="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 h-full -translate-y-1/2 px-2"
        aria-label="{{ __('Clear input') }}"
        tabindex="-1"
    >
        <wire:icon size="4" name="x" />
    </button>
@elseif ($revealable)
    <button
        data-wire-input-reveal
        type="button"
        aria-label="{{ __('Toggle visibility') }}"
        class="text-muted-foreground hover:text-foreground outline-none focus-visible:focus-ring absolute top-1/2 right-2 h-full -translate-y-1/2 px-2"
    >
        <wire:icon size="4" data-wire-reveal-show name="eye" aria-label="show input" />
        <wire:icon size="4" data-wire-reveal-hide name="eye-off" aria-label="hide input" loading />
    </button>
@elseif ($copyable)
    <button
        data-wire-input-copy
        type="button"
        class="text-muted-foreground hover:text-foreground outline-none focus-visible:focus-ring absolute top-1/2 right-2 h-full -translate-y-1/2 px-2"
        aria-label="{{ __('Copy to clipboard') }}"
    >
        <wire:icon size="4" data-wire-input-copy-icon name="copy" />
        <wire:icon size="4" data-wire-input-copy-success name="copy-check" loading />
    </button>
@endif
