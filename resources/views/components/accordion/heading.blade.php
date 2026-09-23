@aware(["headingId", "contentId", "disabled"])
<button
    data-wire-accordion-heading
    type="button"
    {{ $attributes->class("group outline-none focus-visible:focus-ring flex w-full items-center justify-between pb-2 text-sm font-medium disabled:opacity-50") }}
    @if ($disabled)
        disabled
    @endif
    id="{{ $headingId }}"
    aria-controls="{{ $contentId }}"
>
    <div>{{ $slot }}</div>
    <wire:icon
        name="chevron-down"
        @class(["text-muted-foreground !h-5 !w-5 transition-colors group-aria-expanded:rotate-180", "group-hover:text-inherit" => ! $disabled])
    />
</button>
