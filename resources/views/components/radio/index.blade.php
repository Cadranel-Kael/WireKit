<div class="relative flex items-center gap-2">
    <input
        {{ $attributes }}
        type="radio"
        class="border-input-border outline-none focus-visible:focus-ring peer h-5 w-5 appearance-none rounded-full border shadow-sm checked:bg-black"
        id="{{ $id }}"
    />
    <wire:label class="!mb-0" :$id>
        {{ $label }}
    </wire:label>
    <svg
        class="absolute left-1.5 hidden h-2 w-2 text-white duration-200 peer-checked:block"
        viewBox="0 0 8 8"
        fill="currentColor"
    >
        <circle cx="4" cy="4" r="4" />
    </svg>
</div>
