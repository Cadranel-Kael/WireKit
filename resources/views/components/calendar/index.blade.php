<div {{ $attributes }}>
    <div class="flex gap-4">
        <wire:field>
            <wire:label class="sr-only">Month</wire:label>
            <wire:select name="month">
                @foreach ($months() as $month)
                    <wire:select.option :value="$month" :selected="$date->format('M') === $month">
                        {{ $month }}
                    </wire:select.option>
                @endforeach
            </wire:select>
        </wire:field>
        <wire:field>
            <wire:label class="sr-only">Year</wire:label>
            <wire:select>
                @foreach ($years() as $year)
                    <wire:select.option :selected="$date->format('Y') === $year">{{ $year }}</wire:select.option>
                @endforeach
            </wire:select>
        </wire:field>
    </div>
    <div class="grid grid-cols-7 text-sm">
        @foreach ($weekDays() as $weekDay)
            <div class="flex h-8 w-8 items-center justify-center">{{ $weekDay }}</div>
        @endforeach

        @foreach ($days() as $day)
            <button
                type="button"
                aria-label="{{ $day['date']->format('l, jS F, Y') }}"
                @class([
                    'hover:bg-muted outline-none focus-visible:focus-ring flex h-8 w-8 items-center justify-center rounded-md',
                    'text-muted-foreground' => ! $day['currentMonth'],
                ])
            >
                {{ $day['date']->format('d') }}
            </button>
        @endforeach
    </div>
</div>
