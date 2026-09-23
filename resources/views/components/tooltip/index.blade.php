<div data-wire-tooltip data-wire-offset="{{ $offset }}" data-wire-placement="{{ $placement }}">
    <span data-wire-tooltip-trigger aria-describedby="{{ $id }}">{{ $slot }}</span>
    <div
        data-wire-tooltip-content
        id="{{ $id }}"
        class="bg-foreground/80 text-background absolute top-0 left-0 w-max rounded-lg p-1 text-xs"
        role="tooltip"
    >
        {{ $content }}
    </div>
</div>
