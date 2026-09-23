@aware(['descriptionId'])
<div
    id="{{ $descriptionId }}"
    data-wire-description
    {{ $attributes->class(['text-muted-foreground text-sm', 'col-span-full col-start-1' => $position !== 'corner', 'col-start-2 text-right' => $position === 'corner']) }}
>
    {{ $slot }}
</div>
