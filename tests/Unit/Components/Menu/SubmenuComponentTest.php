<?php

use WireKit\View\Components\Menu\Submenu;

describe('Menu\Submenu', function () {

    describe('defaults', function () {
        it('has an empty heading by default', function () {
            $submenu = new Submenu();

            expect($submenu->heading)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a heading', function () {
            $submenu = new Submenu(heading: 'More actions');

            expect($submenu->heading)->toBe('More actions');
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
