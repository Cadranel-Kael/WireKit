<?php

use WireKit\View\Components\InlineEdit\Index;

describe('InlineEdit\\Index', function () {

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

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $inlineEdit = new Index(id: 'custom-id');

            expect($inlineEdit->resolveId())->toBe('custom-id');
        });

        it('falls back to the wire:key prefixed with inline-edit- so morphs keep the id stable', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->resolveId('title'))->toBe('inline-edit-title');
        });

        it('prefers an explicit id over the wire:key', function () {
            $inlineEdit = new Index(id: 'explicit');

            expect($inlineEdit->resolveId('title'))->toBe('explicit');
        });

        it('prefixes the fallback id with inline-edit-', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->resolveId())->toStartWith('inline-edit-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });
});
