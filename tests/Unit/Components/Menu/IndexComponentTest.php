<?php

use WireKit\View\Components\Menu\Index;

describe('Menu\Index', function () {

    describe('defaults', function () {
        it('has an empty id by default', function () {
            $menu = new Index();

            expect($menu->id)->toBe('');
        });

        it('defaults placement to bottom-start', function () {
            $menu = new Index();

            expect($menu->placement)->toBe('bottom-start');
        });
    });

    describe('props', function () {
        it('accepts an id', function () {
            $menu = new Index(id: 'user-menu');

            expect($menu->id)->toBe('user-menu');
        });

        it('accepts a placement', function () {
            $menu = new Index(placement: 'top-end');

            expect($menu->placement)->toBe('top-end');
        });
    });
});
