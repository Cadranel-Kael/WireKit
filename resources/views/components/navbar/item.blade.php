<a
    href="{{ $href }}"
    {{ $attributes->class(['outline-none focus-visible:focus-ring rounded-xs px-4 py-4 text-sm font-medium', 'border-foreground border-b-2' => $current, 'hover:text-foreground text-foreground/60' => ! $current]) }}
>
    {{ $slot }}
</a>
