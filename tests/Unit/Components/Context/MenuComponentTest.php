<?php

use WireKit\View\Components\Context\Menu;

describe('Context\Menu', function () {

    describe('auto-generated menu id', function () {
        it('generates a non-empty menu id', function () {
            $menu = new Menu();

            expect($menu->menuId)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the menu id with menu-', function () {
            $menu = new Menu();

            expect($menu->menuId)->toStartWith('menu-');
        });

        it('generates unique menu ids across instances', function () {
            $a = new Menu();
            $b = new Menu();

            expect($a->menuId)->not->toBe($b->menuId);
        });
    });
});
