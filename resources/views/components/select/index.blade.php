@if ($label)
    <div class="flex flex-col gap-2">
        <wire:label for="{{ $id }}">{{ $label }}</wire:label>
        <wire:select.select id="{{ $id }}" {{ $attributes }}>
            {{ $slot }}
        </wire:select.select>
    </div>
@else
    <wire:select.select id="{{ $id }}" {{ $attributes }}>
        {{ $slot }}
    </wire:select.select>
@endif
