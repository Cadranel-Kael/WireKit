<span data-wire-inline-edit id="{{ $id }}" {{ $attributes->class('inline-flex items-center') }}>
    <span
        data-wire-inline-edit-display
        @if ($triggerOnClick)
            data-wire-inline-edit-trigger="{{ $id }}"
        @endif
        class="{{ $attributes->get('display:class', $triggerOnClick ? 'cursor-pointer' : '') }}"
    >
        {{ $slot->isNotEmpty() ? $slot : $value }}
    </span>
    <input
        type="text"
        data-wire-inline-edit-input
        value="{{ $value }}"
        hidden
        class="{{ $attributes->get('input:class', 'border-border bg-background w-full rounded border px-1.5 py-0.5 text-inherit outline-none') }}"
    />
</span>
