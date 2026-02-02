@aware(['descriptionId', 'descriptionClass'])
<div
    data-wire-alert-description
    id="{{ $descriptionId }}"
    {{ $attributes->class(['text-sm font-normal', $descriptionClass]) }}
>
    {{ $slot }}
</div>
