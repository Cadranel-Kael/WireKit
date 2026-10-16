<?php

use WireKit\View\Components\Select\Option;

describe('Select\\Option', function () {

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

        it('accepts an explicit id', function () {
            $option = new Option(id: 'us-option');

            expect($option->id)->toBe('us-option');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $option = new Option(id: 'us-option');

            expect($option->resolveId())->toBe('us-option');
        });

        it('falls back to the wire:key prefixed with option- so morphs keep the id stable', function () {
            $option = new Option();

            expect($option->resolveId('us'))->toBe('option-us');
        });

        it('prefers an explicit id over the wire:key', function () {
            $option = new Option(id: 'explicit');

            expect($option->resolveId('us'))->toBe('explicit');
        });

        it('prefixes the fallback id with option-', function () {
            $option = new Option();

            expect($option->resolveId())->toStartWith('option-');
        });

        it('generates unique ids across instances', function () {
            $a = new Option();
            $b = new Option();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });
});
