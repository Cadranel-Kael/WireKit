<?php

use WireKit\View\Components\Menu\Submenu;

describe('Menu\\Submenu', function () {

    describe('defaults', function () {
        it('has an empty heading by default', function () {
            $submenu = new Submenu();

            expect($submenu->heading)->toBe('');
        });

        it('defaults placement to right-start', function () {
            $submenu = new Submenu();

            expect($submenu->placement)->toBe('right-start');
        });
    });

    describe('props', function () {
        it('accepts a heading', function () {
            $submenu = new Submenu(heading: 'More actions');

            expect($submenu->heading)->toBe('More actions');
        });

        it('accepts a placement', function () {
            $submenu = new Submenu(placement: 'left-start');

            expect($submenu->placement)->toBe('left-start');
        });

        it('accepts an explicit id', function () {
            $submenu = new Submenu(id: 'more');

            expect($submenu->id)->toBe('more');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $submenu = new Submenu(id: 'more');

            expect($submenu->resolveId())->toBe('more');
        });

        it('falls back to the wire:key prefixed with submenu- so morphs keep the id stable', function () {
            $submenu = new Submenu();

            expect($submenu->resolveId('more'))->toBe('submenu-more');
        });

        it('prefers an explicit id over the wire:key', function () {
            $submenu = new Submenu(id: 'explicit');

            expect($submenu->resolveId('more'))->toBe('explicit');
        });

        it('prefixes the fallback id with submenu-', function () {
            $submenu = new Submenu();

            expect($submenu->resolveId())->toStartWith('submenu-');
        });

        it('generates unique ids across instances', function () {
            $a = new Submenu();
            $b = new Submenu();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });
});
