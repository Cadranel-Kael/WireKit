<th {{ $attributes->class(['py-3 font-medium not-first:ps-3 not-last:pe-3']) }}>
    <div @class(['group flex items-center gap-2', $alignClass])>
        {{ $slot }}
        @if ($sortable)
            <wire:icon
                name="chevron-down"
                @class(['text-muted group-hover:text-foreground size-4', 'rotate-180' => $direction === 'asc', 'opacity-0 group-hover:opacity-100' => ! $sorted])
            />
        @endif
    </div>
</th>
