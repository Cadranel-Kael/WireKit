<div
    x-data="{ show: true }"
>
    <div
        x-show="show"
        x-transition
        role="alert"
        class="px-4 py-3 border border-base-200 max-w-sm rounded flex items-center gap-4 text-sm w-full">
        @if($icon)
            <x-dynamic-component :component="'heroicon-'. $icon" class="w-6 h-6" />
        @endif
        <div class="w-full">
            @if($title)
                <div class="font-semibold">
                    {{ $title }}
                </div>
            @endif
            <div>
                {{ $message ?: $slot }}
            </div>
        </div>
        @if($dismissible)
            <button type="button" class="cursor-pointer" aria-label="Close" x-on:click="show = false">
                <x-heroicon-o-x-mark/>
            </button>
        @endif
    </div>
</div>
