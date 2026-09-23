<?php

use WireKit\View\Components\Table\Column;

describe('Table\Column', function () {

    describe('defaults', function () {
        it('aligns to the start by default', function () {
            $column = new Column();

            expect($column->align)->toBe('start');
        });

        it('is not sortable by default', function () {
            $column = new Column();

            expect($column->sortable)->toBeFalse();
        });

        it('is not sorted by default', function () {
            $column = new Column();

            expect($column->sorted)->toBeFalse();
        });

        it('defaults the sort direction to ascending', function () {
            $column = new Column();

            expect($column->direction)->toBe('asc');
        });

        it('resolves the start alignment class', function () {
            $column = new Column();

            expect($column->alignClass())->toBe('text-start');
        });
    });

    describe('props', function () {
        it('accepts all props together', function () {
            $column = new Column(align: 'end', sortable: true, sorted: true, direction: 'desc');

            expect($column->align)->toBe('end');
            expect($column->sortable)->toBeTrue();
            expect($column->sorted)->toBeTrue();
            expect($column->direction)->toBe('desc');
        });
    });

    describe('alignClass()', function () {
        it('resolves the center alignment class', function () {
            $column = new Column(align: 'center');

            expect($column->alignClass())->toBe('text-center justify-center');
        });

        it('resolves the end alignment class', function () {
            $column = new Column(align: 'end');

            expect($column->alignClass())->toBe('text-end');
        });

        it('throws for an unrecognised alignment', function () {
            $column = new Column(align: 'middle');

            expect(fn () => $column->alignClass())->toThrow(\UnhandledMatchError::class);
        });
    });
});
