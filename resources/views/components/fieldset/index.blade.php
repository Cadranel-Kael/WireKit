<div
    {{ $attributes->class(["w-full max-w-sm", "border-border bg-muted/40 block rounded-xl border " => $variant === "card"]) }}
    @if ($collapsible)
        x-data="{ open: @js($expanded) }"
    @endif
>
    <fieldset data-wire-stack>
        @if ($legend)
            @if ($collapsible)
                <button
                    type="button"
                    x-on:click="open = !open"
                    x-bind:aria-expanded="open"
                    class="group focus-visible:focus-ring flex w-full items-center justify-between rounded-xl px-4 outline-none"
                >
                    <wire:legend @class([$attributes->get("legend:class", "py-4")])>{{ $legend }}</wire:legend>
                    <wire:icon
                        x-show="open"
                        name="chevrons-down-up"
                        class="text-muted-foreground group-hover:text-foreground size-4"
                    />
                    <wire:icon
                        x-show="!open"
                        name="chevrons-up-down"
                        class="text-muted-foreground group-hover:text-foreground size-4"
                    />
                </button>
            @else
                <wire:legend @class([$attributes->get("legend:class", ""), "p-4"])>{{ $legend }}</wire:legend>
            @endif
        @endif

        <div
            @if ($collapsible)
                x-show="open"
                x-collapse
            @endif
            @class([$attributes->get("fields:class", ""), "bg-card ring-border rounded-xl px-4 py-2 ring-1" => $variant === "card"])
        >
            {{ $slot }}
        </div>
    </fieldset>
</div>
