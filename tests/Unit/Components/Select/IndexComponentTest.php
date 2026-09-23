<?php

use WireKit\View\Components\Select\Index;

describe('Select\Index', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $select = new Index();

            expect($select->label)->toBe('');
        });
    });

    describe('auto-generated id', function () {
        it('generates a non-empty id when none is given', function () {
            $select = new Index();

            expect($select->id)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the generated id with select-', function () {
            $select = new Index();

            expect($select->id)->toStartWith('select-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->id)->not->toBe($b->id);
        });

        it('uses the given id instead of generating one', function () {
            $select = new Index(id: 'country');

            expect($select->id)->toBe('country');
        });
    });

    describe('props', function () {
        it('accepts a label', function () {
            $select = new Index(label: 'Country');

            expect($select->label)->toBe('Country');
        });
    });
});
