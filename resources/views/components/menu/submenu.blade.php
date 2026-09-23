<li role="none">
    <button
        {{ $attributes->class('active:bg-muted group focus:bg-muted outline-none focus-visible:focus-ring relative flex w-full gap-2 rounded px-2.5 py-1.5 text-start text-sm') }}
        data-wire-menu-item
        type="button"
        popovertarget="submenu-{{ $id }}"
        role="menuitem"
        aria-haspopup="menu"
    >
        {{ $heading }}
        <wire:icon
            :name="$attributes->get('icon:name', 'chevron-right')"
            :variant="$attributes->get('icon:variant', 'mini')"
            class="ml-auto"
        />
    </button>
    <wire:menu
        id="submenu-{{ $id }}"
        data-wire-menu-sub
        popover
        class="fixed [position-anchor:auto] [position-area:right_span-top] [position-try-fallbacks:flip-inline]"
    >
        {{ $slot }}
    </wire:menu>
</li>
