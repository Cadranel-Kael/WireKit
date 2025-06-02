@aware(['buttonId', 'menuId'])
<x-button
    {{ $attributes }}
    x-on:click="show = !show"
    aria-haspopup="true"
    aria-controls="{{ $menuId }}"
    id="{{ $buttonId }}"
    x-ref="button"
    x-bind:aria-expanded="show"
>
    {{ $slot }}
</x-button>
