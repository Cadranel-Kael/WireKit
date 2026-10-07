<?php

use WireKit\View\Components\InlineEdit\Index;

describe('InlineEdit\Index', function () {

    describe('defaults', function () {
        it('has an empty value by default', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->value)->toBe('');
        });

        it('triggers on click by default', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->triggerOnClick)->toBeTrue();
        });
    });

    describe('props', function () {
        it('accepts a value and can opt out of triggering on click', function () {
            $inlineEdit = new Index(value: 'Hello', triggerOnClick: false);

            expect($inlineEdit->value)->toBe('Hello');
            expect($inlineEdit->triggerOnClick)->toBeFalse();
        });

        it('accepts an explicit id', function () {
            $inlineEdit = new Index(id: 'custom-id');

            expect($inlineEdit->id)->toBe('custom-id');
        });
    });

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->id)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the id with inline-edit-', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->id)->toStartWith('inline-edit-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->id)->not->toBe($b->id);
        });
    });
});
