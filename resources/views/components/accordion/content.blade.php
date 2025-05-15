@aware(["headingId", "contentId", "transition"])
<div
    {{ $attributes->class("text-base-content/80 text-sm font-normal") }}
    x-show="show"
    x-cloak
    @if ($transition)
        x-collapse
    @endif
    :aria-expanded="show ? 'true' : 'false'"
    id="{{ $contentId }}"
    aria-labelledby="{{ $headingId }}"
>
    {{ $slot }}
</div>
