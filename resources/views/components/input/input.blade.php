<input
    {{ $attributes->class(['group-has-[[data-wire-input-error]]:border-danger border-input-border outline-none focus-visible:focus-ring first:group-data-[wire-input-group]/input:rounded-e-none last:group-data-[wire-input-group]/input:rounded-s-none rounded-auto-md placeholder:text-muted-foreground col-span-full w-full border p-2 text-sm', 'pl-8' => $icon, 'pr-8' => $leftIcon])->merge(['type' => 'text']) }}
    data-wire-input
    data-wire-field
/>
