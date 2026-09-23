@aware(['variant', 'multiple'])

@if ($variant === 'listbox')
    @if ($multiple)
        <button
            data-select-option
            class="data-focused:bg-muted outline-none focus-visible:focus-ring group flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-left"
            type="button"
        >
            <span class="w-6">
                <wire:icon class="text-foreground hidden group-data-[selected]:block" name="check" variant="micro" />
            </span>
            {{ $slot }}
        </button>
    @else
        <button
            @click="option='{{ $slot }}'; show=false"
            class="hover:bg-muted outline-none focus-visible:focus-ring group flex w-full items-center gap-1 px-2 py-1 text-left"
            type="button"
            x-bind:data-selected="option === '{{ $slot }}' ? '' : null"
        >
            <span class="w-6">
                <wire:icon class="text-foreground hidden group-data-[selected]:block" name="check" variant="micro" />
            </span>
            {{ $slot }}
        </button>
    @endif
@elseif ($variant === 'combobox')
    <button
        data-wire-option
        class="data-focused:bg-muted outline-none focus-visible:focus-ring group flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-left"
        type="button"
    >
        <span class="w-6">
            <wire:icon class="text-foreground hidden group-data-[selected]:block" name="check" variant="micro" />
        </span>
        {{ $slot }}
    </button>
@else
    <option {{ $attributes }} @if($selected) selected @endif @if($value) value="{{ $value }}" @endif>
        {{ $slot }}
    </option>
@endif
