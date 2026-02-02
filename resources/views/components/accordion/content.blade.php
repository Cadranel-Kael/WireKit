@aware(['headingId', 'contentId'])
<div
    data-wire-accordion-content
    {{ $attributes->class('text-base-content text-sm font-normal')->merge(['role' => 'region']) }}
    id="{{ $contentId }}"
    aria-labelledby="{{ $headingId }}"
    >
    {{ $slot }}
</div>
