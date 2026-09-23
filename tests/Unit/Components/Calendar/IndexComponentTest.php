<?php

use Carbon\Carbon;
use WireKit\View\Components\Calendar\Index;

describe('Calendar\Index', function () {

    describe('defaults', function () {
        it('defaults the locale to en', function () {
            $calendar = new Index();

            expect($calendar->locale)->toBe('en');
        });

        it('defaults the month and year to the current month and year', function () {
            $calendar = new Index();

            expect($calendar->month)->toBe(Carbon::now()->format('m'));
            expect($calendar->year)->toBe(Carbon::now()->format('Y'));
        });

        it('resolves the date from the resolved month and year', function () {
            $calendar = new Index(month: '2', year: '2026');

            expect($calendar->date->format('Y-m'))->toBe('2026-02');
        });
    });

    describe('props', function () {
        it('accepts an explicit month and year', function () {
            $calendar = new Index(month: '6', year: '2030');

            expect($calendar->month)->toBe('6');
            expect($calendar->year)->toBe('2030');
        });

        it('defaults startOfWeek to Monday', function () {
            $calendar = new Index();

            expect($calendar->startOfWeek)->toBe('Monday');
        });
    });

    describe('months()', function () {
        it('returns the 12 abbreviated month names in order', function () {
            $calendar = new Index();

            expect($calendar->months())->toBe([
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ]);
        });
    });

    describe('years()', function () {
        it('returns 101 years starting from the current year, descending', function () {
            $calendar = new Index();

            $years = $calendar->years();

            expect($years)->toHaveCount(101);
            expect($years[0])->toBe(Carbon::now()->format('Y'));
            expect($years[1])->toBe(Carbon::now()->subYear()->format('Y'));
        });
    });

    describe('weekDays()', function () {
        it('returns 7 two-letter weekday abbreviations starting on Monday', function () {
            $calendar = new Index();

            expect($calendar->weekDays())->toBe(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
        });
    });

    describe('days()', function () {
        it('returns a full 5-week grid for a month starting on the last day of the previous week', function () {
            // February 2026 starts on a Sunday, so the grid should pad backwards
            // to the previous Monday and forwards to the following Sunday.
            $calendar = new Index(month: '2', year: '2026');

            $days = $calendar->days();

            expect($days)->toHaveCount(35);
            expect($days[0]['date']->format('Y-m-d'))->toBe('2026-01-26');
            expect(end($days)['date']->format('Y-m-d'))->toBe('2026-03-01');
        });

        it('marks days outside the target month as not belonging to the current month', function () {
            $calendar = new Index(month: '2', year: '2026');

            $days = $calendar->days();

            expect($days[0]['currentMonth'])->toBeFalse(); // Jan 26
            expect(end($days)['currentMonth'])->toBeFalse(); // Mar 1
        });

        it('marks days inside the target month as belonging to the current month', function () {
            $calendar = new Index(month: '2', year: '2026');

            $days = $calendar->days();
            $feb14 = collect($days)->first(fn ($day) => $day['date']->format('Y-m-d') === '2026-02-14');

            expect($feb14['currentMonth'])->toBeTrue();
        });
    });
});
