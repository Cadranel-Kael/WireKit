@aware(['groupId', 'transition'])
<div
    data-wire-accordion
    data-wire-expanded="@js($expanded)"
    data-disabled="@js($disabled)"
    data-wire-group="{{ $groupId }}"
    data-wire-transition="@js($transition)";
    {{ $attributes->class('border-border flex max-w-sm flex-col pb-2 not-last:border-b') }}
>
    @if ($heading)
        <wire:accordion.heading :class="$attributes->get('heading:class', '')">{{ $heading }}</wire:accordion.heading>
        <wire:accordion.content :class="$attributes->get('content:class', '')">{{ $slot }}</wire:accordion.content>
    @else
        {{ $slot }}
    @endif
</div>
