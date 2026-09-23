<ol
    role="tree"
    data-wire-tree
    id="{{ $id }}"
    @if ($sortable)
        data-wire-sortable
    @endif
    @if ($nested)
        data-wire-nested
    @endif
    {{ $attributes->class(["border-border bg-muted flex flex-col rounded-lg border p-2 text-sm", "gap-0.5" => $variant === "file"]) }}
>
    {{ $slot }}
</ol>
