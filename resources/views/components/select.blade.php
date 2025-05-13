<div
    x-data="{ select: '' }"
    {{ $attributes->class('relative flex flex-col gap-2') }}
>
    <label
        @class([
            'text-sm font-medium',
            'sr-only' => $labelSrOnly,
        ])
        for="{{ $id }}"
    >
        {{ $label }}
    </label>
    <div
        class="{{ $inputClass }} border-base-200 relative h-9 w-fit min-w-fit rounded-md border px-2 text-sm shadow-sm"
    >
        <select
            x-model="select"
            :class="select ? '' : 'text-gray-500'"
            {{ $attributes->whereDoesntStartWith('class') }}
            class="w-full min-w-10 cursor-pointer py-2"
            id="{{ $id }}"
        >
            @foreach ($options as $key => $option)
                <option value="{{ $key }}">
                    {{ $option }}
                </option>
            @endforeach
        </select>
    </div>
</div>
