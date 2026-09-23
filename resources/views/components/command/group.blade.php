<div {{ $attributes->class('border-border my-2 border-b pb-1 last:border-none last:pb-0') }}>
    <div
        @class(['text-muted-foreground mb-0.5 ml-2 text-sm', $attributes->get('heading:class')])
        aria-hidden="true"
        id="{{ $id }}"
    >
        {{ $heading }}
    </div>
    <div role="group" aria-labelledby="{{ $id }}">
        {{ $slot }}
    </div>
</div>
