<td
    {{ $attributes->class(['text-foreground dark:bg-foreground dark:text-background overflow-clip bg-white py-3 text-ellipsis not-first:ps-3 not-last:pe-3', $alignClass]) }}
>
    <span @class(['flex', $alignClass])>
        {{ $slot }}
    </span>
</td>
