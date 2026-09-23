<textarea
    {{ $disabled ? 'disabled' : '' }}
    {{ $attributes->class(['border-input-border invalid:border-danger invalid:outline-danger/20 disabled:bg-muted outline-none focus-visible:focus-ring rounded-auto-md placeholder:text-muted-foreground col-span-full w-full border p-2 text-sm invalid:outline-3 disabled:cursor-not-allowed']) }}
    data-wire-textarea
    data-wire-field
>
{{ $slot }}</textarea
>
