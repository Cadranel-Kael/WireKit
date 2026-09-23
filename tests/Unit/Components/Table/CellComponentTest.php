<?php

use WireKit\View\Components\Table\Cell;

describe('Table\Cell', function () {

    describe('defaults', function () {
        it('aligns to the start by default', function () {
            $cell = new Cell();

            expect($cell->align)->toBe('start');
        });

        it('resolves the start alignment classes', function () {
            $cell = new Cell();

            expect($cell->alignClass())->toBe('text-start justify-start');
        });
    });

    describe('alignClass()', function () {
        it('resolves the center alignment classes', function () {
            $cell = new Cell(align: 'center');

            expect($cell->alignClass())->toBe('text-center justify-center');
        });

        it('resolves the end alignment classes', function () {
            $cell = new Cell(align: 'end');

            expect($cell->alignClass())->toBe('text-end justify-end');
        });

        it('throws for an unrecognised alignment', function () {
            $cell = new Cell(align: 'middle');

            expect(fn () => $cell->alignClass())->toThrow(\UnhandledMatchError::class);
        });
    });
});
