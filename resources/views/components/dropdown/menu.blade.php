@aware(['menuId', 'buttonId'])
<ul
    {{ $attributes->class(['flex w-fit min-w-48 flex-col rounded absolute bg-white p-1.5 gap-0.5 shadow border border-core-200'])->merge(['role' => 'menu']) }}
    x-show="show"
    x-cloak
    x-on:click.away="show = false"
    x-ref="menu"
    id="{{ $menuId }}"
    aria-labelledby="{{ $buttonId }}"
    tabindex="-1"
>
    {{ $slot }}
</ul>
