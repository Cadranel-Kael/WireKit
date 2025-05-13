<div class="h-screen w-3xs shrink-0 p-2 pt-14 border-r border-base-200">
    @if ($appTitle)
        <div class="font-semibold ml-3.5 mb-8">{{ config('app.name') }}</div>
    @endif
    <nav role="menu" class="flex flex-col gap-1">
        <h2 class="sr-only">{{ __('Side navigation') }}</h2>
        <ul>
            {{ $slot }}
        </ul>
    </nav>
</div>
