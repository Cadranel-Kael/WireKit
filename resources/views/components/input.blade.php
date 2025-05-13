<div
    {{ $attributes->class('relative flex flex-col gap-2') }}
    x-data="{
        show: false,
    }"
>
    <label
        @class([
            'text-sm font-medium',
            'sr-only' => $labelSrOnly,
        ])
        for="{{ $id }}"
    >
        {{ $label }}
        @if ($required)
            <span class="text-error">*</span>
        @endif
    </label>
    <div class="relative w-full text-sm">
        @if ($icon)
            <div
                class="{{ $iconClass }} text-base-content/50 pointer-events-none absolute start-0 top-0 bottom-0 z-1 flex items-center justify-center ps-3"
            >
                <x-icon
                    class="!h-5 !w-5"
                    name="{{ $icon }}"
                />
            </div>
        @endif

        <input
            class="{{ $inputClass }} {{ $icon ? 'ps-10' : 'ps-3' }} {{ $errors->has($attributes->wire('model')->value()) ? 'border-error' : 'border-base-300' }} relative h-9 w-full rounded-md border py-2 pe-3 shadow-sm"
            {{ $attributes }}
            :type="show ? 'text' : '{{ $type }}'"
            placeholder="{{ $placeholder }}"
            id="{{ $id }}"
        />
        @if ($type === 'password')
            <button
                class="text-base-content/50 absolute end-0 top-0 bottom-0 flex cursor-pointer items-center justify-center pe-3"
                type="button"
                x-on:click="show = !show"
                :aria-label="show ? 'Hide password' : 'Show password'"
            >
                <template x-if="!show">
                    <x-icon
                        name="o-eye"
                        class="!h-5 !w-5"
                    />
                </template>
                <template x-if="show">
                    <x-icon
                        name="o-eye-slash"
                        class="!h-5 !w-5"
                    />
                </template>
            </button>
        @endif
    </div>
    @if ($hint)
        <div>{{ $hint }}</div>
    @endif

    @error($attributes->wire('model')->value())
        <div class="text-error text-sm">
            {{ $message }}
        </div>
    @enderror

    {{ $slot }}
</div>
