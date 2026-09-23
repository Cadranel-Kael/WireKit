<?php

use WireKit\View\Components\Menu\Index;

describe('Menu\Index', function () {

    describe('defaults', function () {
        it('has an empty id by default', function () {
            $menu = new Index();

            expect($menu->id)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts an id', function () {
            $menu = new Index(id: 'user-menu');

            expect($menu->id)->toBe('user-menu');
        });
    });
});
