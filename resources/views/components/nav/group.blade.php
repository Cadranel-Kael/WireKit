<div
    data-wire-nav-group
    {{ $attributes->class("group") }}
    @if ($collapsible)
        data-wire-collapsible
        x-data="{ show: '{{ $collapsed }}' }"
        :data-wire-collapsed="!show"
    @endif
>
    @if ($collapsible)
        <button
            x-on:click="show=!show"
            data-wire-nav-group-heading
            class="text-foreground/60 hover:bg-foreground/10 hover:text-foreground outline-none focus-visible:focus-ring relative my-0.5 flex w-full items-center rounded px-2 py-1.5 pl-8 text-left text-sm font-medium"
        >
            <wire:icon
                :name="$attributes->get('icon:name', 'chevron-down')"
                :size="$attributes->get('icon:size', '4')"
                :class="$attributes->get('icon:class', 'absolute left-2 group-data-[wire-collapsed]:-rotate-90')"
            />
            {{ $heading }}
        </button>
    @else
        <div data-wire-nav-group-heading class="text-foreground/60 w-full rounded px-2 py-1 text-sm">
            {{ $heading }}
        </div>
    @endif
    <div
        class="border-border ml-4 border-l pl-2"
        @if ($collapsible)
            x-show="show"
        @endif
    >
        {{ $slot }}
    </div>
</div>
