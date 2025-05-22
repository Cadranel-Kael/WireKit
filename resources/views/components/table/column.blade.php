<th {{ $attributes->class(['py-3 not-first:ps-3 not-last:pe-3']) }}>
    <div @class(['group flex items-center gap-2', $alignClass])>
        {{ $slot }}
        @if ($sortable)
            <x-icon
                name="m-chevron-down"
                @class(['text-core-500 group-hover:text-core-950', 'rotate-180' => $direction === 'asc', 'opacity-0 group-hover:opacity-100' => ! $sorted])
            />
        @endif
    </div>
</th>
