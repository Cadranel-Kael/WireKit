<wire:fieldset {{ $attributes }}>
    <wire:legend class="mb-1" size="sm">
        {{ $label }}
    </wire:legend>
    <div class="flex flex-col gap-2">
        {{ $slot }}
    </div>
</wire:fieldset>
