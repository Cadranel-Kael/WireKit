<wire-otp length="{{ $length }}" class="relative flex w-full flex-row gap-2">
    @if ($label)
        <wire:label {{ $attributes->thatStartWith('label:') }}>
            {{ $label }}
        </wire:label>
    @endif

    @if ($slot->isEmpty())
        @foreach (range(1, $length) as $i)
            <wire:otp.input data-wire-otp-box="{{ $i - 1 }}" />
        @endforeach
    @else
        {{ $slot }}
    @endif
    <input
        class="hidden"
        type="text"
        {{ $attributes }}
        data-wire-otp-input
        maxlength="{{ $length }}"
        pattern="\d*"
        {{ $attributes->except(['class'])->whereDoesntStartWith('label:') }}
    />
</wire-otp>
