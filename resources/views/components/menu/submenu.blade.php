<div
    {{ $attributes->class('data-active:bg-core-100 dark:data-active:bg-core-600 group focus:bg-core-100 relative flex w-full gap-2 rounded px-2.5 py-1.5 text-start text-sm focus:outline-none') }}
    data-wire-menu-item
    role="menuitem"
    aria-haspopup="menu"
>
    {{ $heading }}
    <wire:icon
        :name="$attributes->get('icon:name', 'chevron-right')"
        :variant="$attributes->get('icon:variant', 'mini')"
        class="ml-auto"
    />
    <wire:menu data-wire-menu-sub class="absolute top-0 left-full focus:outline-none">
        {{ $slot }}
    </wire:menu>
</div>
