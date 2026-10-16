<?php

use WireKit\View\Components\Dropdown\Index;

describe('Dropdown\\Index', function () {

    describe('resolveDropdownId()', function () {
        it('prefers an explicit id', function () {
            $dropdown = new Index(id: 'actions');

            expect($dropdown->resolveDropdownId())->toBe('actions');
        });

        it('falls back to the wire:key prefixed with dropdown- so morphs keep the id stable', function () {
            $dropdown = new Index();

            expect($dropdown->resolveDropdownId('actions'))->toBe('dropdown-actions');
        });

        it('prefers an explicit id over the wire:key', function () {
            $dropdown = new Index(id: 'explicit');

            expect($dropdown->resolveDropdownId('actions'))->toBe('explicit');
        });

        it('prefixes the fallback id with dropdown-', function () {
            $dropdown = new Index();

            expect($dropdown->resolveDropdownId())->toStartWith('dropdown-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveDropdownId())->not->toBe($b->resolveDropdownId());
        });
    });
});
