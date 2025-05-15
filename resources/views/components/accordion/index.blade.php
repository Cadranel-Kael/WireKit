<div
    class="flex flex-col gap-4"
    @if ($exclusive)
        x-init="$store.accordion = { openItem: null, counter: 0 }"
    @endif
>
    {{ $slot }}
</div>
