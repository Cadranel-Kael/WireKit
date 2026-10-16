<?php

use WireKit\View\Components\Select\Index;

describe('Select\\Index', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $select = new Index();

            expect($select->label)->toBe('');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $select = new Index(id: 'country');

            expect($select->resolveId())->toBe('country');
        });

        it('falls back to the wire:key prefixed with select- so morphs keep the id stable', function () {
            $select = new Index();

            expect($select->resolveId('country'))->toBe('select-country');
        });

        it('prefers an explicit id over the wire:key', function () {
            $select = new Index(id: 'explicit');

            expect($select->resolveId('country'))->toBe('explicit');
        });

        it('prefixes the fallback id with select-', function () {
            $select = new Index();

            expect($select->resolveId())->toStartWith('select-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('props', function () {
        it('accepts a label', function () {
            $select = new Index(label: 'Country');

            expect($select->label)->toBe('Country');
        });
    });
});
