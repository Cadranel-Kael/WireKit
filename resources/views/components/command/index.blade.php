<div
    x-data="{
        commands,
        getCommands() {
            commands
        },
    }"
    {{ $attributes->class('border-border min-w-md rounded-lg border bg-card shadow-md') }}
>
    <wire:input
        icon="magnifying-glass"
        input:class="rounded-b-none border-0 border-b !shadow-none"
        clearable
        placeholder="Type a command or search..."
    />
    {{ $slot }}
</div>
