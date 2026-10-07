<?php

use WireKit\View\Components\Menu\Submenu;

describe('Menu\Submenu', function () {

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
    });

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $submenu = new Submenu();

            expect($submenu->id)->toBeString()->not->toBeEmpty();
        });

        it('generates unique ids across instances', function () {
            $a = new Submenu();
            $b = new Submenu();

            expect($a->id)->not->toBe($b->id);
        });
    });
});
