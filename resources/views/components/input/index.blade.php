@aware(["labelId", "descriptionId", "isInGroup" => false])
@php($labelId = $labelId ?: uniqid("label-"))
@php($descriptionId = $descriptionId ?: uniqid("description-"))

@if ($label || $description)
    <wire:field :$labelId :$descriptionId class="group">
        <wire:label :class="$attributes->get('label:class', '')">{{ $label }}</wire:label>

        @if ($description && $attributes->get("description:position", "") !== "after")
            <wire:description
                :class="$attributes->get('description:class', '')"
                :position="$attributes->get('description:position', 'before')"
            >
                {{ $description }}
            </wire:description>
        @endif

        @if ($description && $attributes->get("description:position", "before") === "after")
            <wire:description :class="$attributes->get('description:class', '')">
                {{ $description }}
            </wire:description>
        @endif

        <div
            @class(["rounded-auto-md relative col-span-full w-full max-w-sm", $attributes->get("container:class", "")])
            data-wire-input-container
            @if ($clearable)
                data-wire-feature="clearable"
            @elseif ($revealable)
                data-wire-feature="revealable"
            @elseif ($copyable)
                data-wire-feature="copyable"
            @endif
        >
            @if ($icon)
                <div class="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <wire:icon :name="$icon" size="4" />
                </div>
            @endif

            <wire:input.input
                :icon="$icon"
                :left-icon="$attributes->get('icon:after')"
                :id="$labelId"
                {{ $attributes }}
            />
            <wire:input.button :clearable="$clearable" :revealable="$revealable" :copyable="$copyable" />
            @if ($attributes->get("icon:after", false) || isset($iconAfter))
                <div class="text-muted-foreground absolute inset-y-0 right-0 flex items-center pr-3">
                    @isset($iconAfter)
                        {{ $iconAfter }}
                    @else
                        <wire:icon class="pointer-events-none" :name="$attributes->get('icon:after')" size="4" />
                    @endisset
                </div>
            @endif
        </div>
        @if ($name = $resolvedName())
            @error($name)
                <div data-wire-input-error class="text-danger peer">
                    {{ $message }}
                </div>
            @enderror
        @endif
    </wire:field>
@else
    <div
        @class(["rounded-auto-md relative col-span-full w-full max-w-sm", $attributes->get("container:class", "")])
        data-wire-input-container
        @if ($clearable)
            data-wire-feature="clearable"
        @elseif ($revealable)
            data-wire-feature="revealable"
        @elseif ($copyable)
            data-wire-feature="copyable"
        @endif
    >
        @if ($icon)
            <div class="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <wire:icon :name="$icon" size="4" />
            </div>
        @endif

        <wire:input.input :icon="$icon" :left-icon="$attributes->get('icon:after')" :id="$labelId" {{ $attributes }} />
        <wire:input.button :clearable="$clearable" :revealable="$revealable" :copyable="$copyable" />

        @if ($attributes->get("icon:after", false) || isset($iconAfter))
            <div class="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                @isset($iconAfter)
                    {{ $iconAfter }}
                @else
                    <wire:icon :name="$attributes->get('icon:after')" size="4" />
                @endisset
            </div>
        @endif
    </div>
@endif
