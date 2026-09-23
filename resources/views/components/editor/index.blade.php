<div
    role="textbox"
    data-wire-editor
    wire:ignore
    {{ $attributes->except(['wire:model', 'wire:model.live', 'wire:model.lazy', 'wire:model.blur'])->class('rounded-base border-input-border relative max-w-full overflow-auto border') }}
>
    @if ($toolbar)
        <wire:editor.toolbar>
            @foreach ($toolbarItems() as $item)
                <x-dynamic-component :component="'wire::editor.toolbar.' . $item" />
            @endforeach
        </wire:editor.toolbar>
    @endif

    <wire:editor.content></wire:editor.content>

    @if ($attributes->whereStartsWith('wire:model')->isNotEmpty())
        <textarea {{ $attributes->whereStartsWith('wire:model') }} class="sr-only" tabindex="-1" data-wire-editor-sync>
{{ $slot }}</textarea
        >
    @endif
</div>
