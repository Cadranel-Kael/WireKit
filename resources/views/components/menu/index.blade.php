<div
    role="menu"
    data-wire-menu
    tabindex="-1"
    id="{{ $id }}"
    {{ $attributes->class(['border-core-200 z-20 w-52 rounded-lg border bg-white p-2 text-sm shadow shadow-md focus:outline-none']) }}
>
    {{ $slot }}
</div>
