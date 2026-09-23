<div>
    <input
        {{ $attributes->class('border-border h-10 w-8 rounded-lg border text-center shadow-xs read-only:text-transparent outline-none focus:focus-ring') }}
        pattern="\d{1}"
        maxlength="1"
        data-wire-otp-box
        tabindex="-1"
        readonly
    />
</div>
