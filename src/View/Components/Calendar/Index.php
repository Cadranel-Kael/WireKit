<?php

namespace WireKit\View\Components\Calendar;

use Carbon\Carbon;
use Illuminate\View\Component;

class Index extends Component
{
    public Carbon $date;

    public function __construct(
        public string $locale = 'en',
        public string $month = '',
        public string $year = '',
        public string $startOfWeek = 'Monday',
    ) {
        $this->month = $this->month ?: Carbon::now()->format('m');
        $this->year = $this->year ?: Carbon::now()->format('Y');

        $this->date = Carbon::create($this->year, $this->month);
    }

    public function months()
    {
        return array_map(fn ($month) => Carbon::create(null, $month)->format('M'), range(1, 12));
    }

    public function years()
    {
        return array_map(fn ($year) => Carbon::now()->subYears($year)->format('Y'), range(0, 100));
    }

    public function weekDays()
    {
        return array_map(fn ($day) => substr(Carbon::now()->startOfWeek()->addDays($day)->format('l'), 0, 2), range(0, 6));
    }

    public function days()
    {
        // 1. First and last day of the month
        $firstDay = Carbon::create($this->year, $this->month, 1);
        $lastDay = $firstDay->copy()->endOfMonth();

        // 2. Determine the first day to display (start of the first week)
        $start = $firstDay->copy()->startOfWeek();

        // 3. Determine the last day to display (end of the last week)
        $end = $lastDay->copy()->endOfWeek();

        // 4. Loop through each day
        $days = [];
        for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
            $days[] = [
                'date' => $date->copy(),
                'currentMonth' => $date->month === $this->date->month, // marks if it's in the target month
            ];
        }

        return $days;
    }

    public function render()
    {
        return view('wire-kit::components.calendar.index');
    }
}
