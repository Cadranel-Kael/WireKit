@aware(["headingId", "contentId", "disabled", "inclusive"])
<button
    type="button"
    {{ $attributes->class(["group flex w-full cursor-pointer items-center justify-between pb-2 text-sm font-medium", "text-base-content/50" => $disabled]) }}
    @if (! $disabled)
        @click="toggle"
    @else
        disabled
    @endif
    id="{{ $headingId }}"
    aria-controls="{{ $contentId }}"
>
    <div>{{ $slot }}</div>
    <x-icon
        x-bind:class="show ? '-rotate-180' : 'text-base-content/50'"
        name="c-chevron-up"
        @class(["transition-colors !w-5 !h-5", "group-hover:text-base-content" => ! $disabled])
    />
</button>
