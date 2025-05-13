<div
    x-id="['checkbox']"
    {{ $attributes->whereStartsWith(['class']) }}
>
    <input
        {{ $attributes->whereStartsWith(['wire:', 'x-', '@']) }}
        value="{{ $value }}"
        class="cursor-pointer"
        :id="$id('checkbox')"
        type="checkbox">
    <label
        @class([
            'text-sm',
            'sr-only' => $labelSrOnly,
        ])
        class=""
        :for="$id('checkbox')"
    >
        {{ $label }}
    </label>
</div>
