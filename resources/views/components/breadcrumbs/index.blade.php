<nav
    {{ $attributes }}
    aria-label="{{ __('Breadcrumb') }}"
>
    <ol class="flex gap-1">
        {{ $slot }}
    </ol>
</nav>
