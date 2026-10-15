<ol
    role="tree"
    data-wire-tree
    data-wire-tree-variant="{{ $variant }}"
    id="{{ $resolveId($attributes->get('wire:key')) }}"
    @if ($sortable)
        data-wire-sortable
    @endif
    @if ($nested)
        data-wire-nested
    @endif
    {{ $attributes->class(["flex flex-col p-2 text-sm", $variantClass()]) }}
>
    {{ $slot }}
</ol>
