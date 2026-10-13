<?php

namespace WireKit\View\Components\Calendar;

use Carbon\Carbon;
use Illuminate\View\Component;

/**
 * A month calendar grid.
 */
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

    /**
     * Get the abbreviated name of each month of the year.
     */
    public function months()
    {
        return array_map(fn ($month) => Carbon::create(null, $month)->format('M'), range(1, 12));
    }

    /**
     * Get the current year and the preceding 100 years.
     */
    public function years()
    {
        return array_map(fn ($year) => Carbon::now()->subYears($year)->format('Y'), range(0, 100));
    }

    /**
     * Get the abbreviated name of each day of the week, starting from the configured start-of-week day.
     */
    public function weekDays()
    {
        return array_map(fn ($day) => substr(Carbon::now()->startOfWeek()->addDays($day)->format('l'), 0, 2), range(0, 6));
    }

    /**
     * Get every day to display in the grid, padded to full weeks before and after the target month.
     *
     * @return array<int, array{date: Carbon, currentMonth: bool}>
     */
    public function days()
    {
        $firstDay = Carbon::create($this->year, $this->month, 1);
        $lastDay = $firstDay->copy()->endOfMonth();

        $start = $firstDay->copy()->startOfWeek();
        $end = $lastDay->copy()->endOfWeek();

        $days = [];
        for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
            $days[] = [
                'date' => $date->copy(),
                'currentMonth' => $date->month === $this->date->month,
            ];
        }

        return $days;
    }

    public function render()
    {
        return view('wire-kit::components.calendar.index');
    }
}
