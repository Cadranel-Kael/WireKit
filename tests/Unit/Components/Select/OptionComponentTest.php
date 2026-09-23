<?php

use WireKit\View\Components\Select\Option;

describe('Select\Option', function () {

    describe('defaults', function () {
        it('has an empty value by default', function () {
            $option = new Option();

            expect($option->value)->toBe('');
        });

        it('is not selected by default', function () {
            $option = new Option();

            expect($option->selected)->toBeFalse();
        });
    });

    describe('props', function () {
        it('accepts a value and selected state', function () {
            $option = new Option(value: 'us', selected: true);

            expect($option->value)->toBe('us');
            expect($option->selected)->toBeTrue();
        });
    });

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $option = new Option();

            expect($option->id)->not->toBeEmpty();
        });

        it('generates unique ids across instances', function () {
            $a = new Option();
            $b = new Option();

            expect($a->id)->not->toBe($b->id);
        });
    });
});
