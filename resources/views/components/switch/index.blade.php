<label class="inline-flex items-center gap-0.5">
    <input
        role="switch"
        type="checkbox"
        {{ $attributes->class('peer group absolute m-0 size-px opacity-0') }}
    />
    <span
        class="bg-muted peer-checked:bg-primary peer-invalid:border-danger peer-invalid:outline-danger/30 peer-focus-visible:focus-ring relative box-content h-4.5 w-9 rounded-full border transition-colors peer-checked:*:translate-x-4.5 peer-invalid:outline-2 peer-disabled:opacity-50"
    >
        <span class="bg-background absolute top-px left-px size-4 rounded-full shadow-2xs transition-transform"></span>
    </span>
    @if ($label)
        <span class="peer-invalid:text-danger peer-disabled:text-muted-foreground ml-2 text-sm font-medium">
            {{ $label }}
        </span>
    @endif
</label>
