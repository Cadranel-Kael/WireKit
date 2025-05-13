{{--<label--}}
{{--    x-data--}}
{{--    x-id="['search']"--}}
{{--    {{ $attributes->class('max-w-3xs rounded bg-base-200 pl-2 h-9 w-full flex gap-2 items-center text-base-content') }}--}}
{{--    :for="$id('search')"--}}
{{-->--}}
{{--    <span class="sr-only">Search</span>--}}

{{--    <x-icon name="o-magnifying-glass" class="text-base-content" />--}}
{{--    <input--}}
{{--        :id="$id('search')"--}}
{{--        type="text"--}}
{{--        class="w-full"--}}
{{--        placeholder="Search">--}}
{{--</label>--}}

<x-input {{ $attributes->class('max-w-3xs') }} :label="__('Search')" label-sr-only :placeholder="$placeholder" icon="o-magnifying-glass" icon-class="!text-base-content" input-class="!shadow-none border-none bg-base-200" />
