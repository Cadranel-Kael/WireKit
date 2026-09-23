<div
    data-wire-toast
    popover="manual"
    data-wire-max="{{ $max }}"
    @class(['fixed grid max-w-sm overflow-visible bg-transparent', $resolvePlacement])
>
    <template data-wire-toast-template>
        <wire-toast class="block" data-wire-direction="{{ $resolveDirection }}">
            <wire:alert
                inline
                class="open:animate-pop-in closing:animate-pop-out bg-background pointer-events-auto relative overflow-hidden shadow-sm"
                :heading:class="$attributes->get('heading:class', '')"
            >
                <x-slot:heading>
                    <span data-wire-toast-heading></span>
                </x-slot>

                <span data-wire-toast-message></span>
                <x-slot:actions>
                    <wire:button variant="ghost" icon="x" aria-label="dismiss" data-wire-toast-dismiss />
                </x-slot>
            </wire:alert>
        </wire-toast>
    </template>
</div>
