<div x-data="{ tooltip: '{{ $content }}' }">
    {{ $slot->withAttributes(['class' => 'test']) }}
</div>
