<x-dynamic-component
    data-wire-icon
    :component="$iconSet . '-' . $name"
    {{ $attributes->class(twMerge('size-5', $attributes->get('class'))) }}
/>
