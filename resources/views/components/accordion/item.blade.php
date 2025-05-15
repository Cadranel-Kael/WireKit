@aware(["exclusive", "transition"])
<div
    @if (! $exclusive)
        x-data="{
            show: @js($expanded),
            toggle() {
                this.show = ! this.show
            },
        }"
    @else
        x-data="{
            index: Alpine.store('accordion').counter++,
            get show() {
                return Alpine.store('accordion').openItem === this.index
            },
            toggle() {
                Alpine.store('accordion').openItem = this.show ? null : this.index
            },
        }"
    @endif
    {{ $attributes->class("border-base-content/30 flex max-w-sm flex-col border-b pb-2") }}
>
    @if ($heading)
        <x-accordion.heading>{{ $heading }}</x-accordion.heading>
        <x-accordion.content>{{ $slot }}</x-accordion.content>
    @else
        {{ $slot }}
    @endif
</div>
