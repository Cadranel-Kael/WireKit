<wire:fieldset data-wire-description="{{ $descriptionPosition($attributes) }}" {{ $attributes->class(['group']) }}>
    @if ($legend)
        <wire:legend>
            {{ $legend }}
        </wire:legend>
    @endif

    {{ $slot }}
</wire:fieldset>
