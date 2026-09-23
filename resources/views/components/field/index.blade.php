<div
    data-wire-field
    {{
        $attributes->class([
            '[&:has(textarea:aria-invalid)_label]:text-alert w-full not-last:mb-3 [&>[data-wire-description]:not(.sr-only)+[data-wire-input-container]]:mt-2 [&>[data-wire-input-container]+[data-wire-description]]:mt-2 [&>[data-wire-label]:not(.sr-only)+[data-wire-description]]:mt-0.5 [&>[data-wire-label]:not(.sr-only)+[data-wire-editor]]:mt-2 [&>[data-wire-label]:not(.sr-only)+[data-wire-input-container]]:mt-2 [&>[data-wire-label]:not(.sr-only)+[data-wire-input-group]]:mt-2',
            'flex-col' => $display === 'block',
            'grid-cols-[auto_1fr] gap-x-2 gap-y-0.5' => $display === 'inline',
            'grid grid-cols-2' => $descriptionPosition($attributes) === 'block',
        ])
    }}
>
    {{ $slot }}
</div>
