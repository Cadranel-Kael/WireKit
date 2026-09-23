@aware(['labelId'])
<label
    for="{{ $labelId }}"
    data-wire-label
    {{ $attributes->class('text-sm peer')->except('id') }}
>
    {{ $slot }}
</label>
