<div
    id="{{ $id }}"
    data-wire-sidebar
    data-wire-expanded="@js($open)"
    {{
        $attributes->class([
            'sticky top-0 flex h-screen flex-col overscroll-none transition-[width,padding] duration-200 [grid-area:sidebar]',
            'w-2xs p-4' => $open,
            'w-0 overflow-hidden p-0' => ! $open,
        ])
    }}
>
    {{ $slot }}
</div>
