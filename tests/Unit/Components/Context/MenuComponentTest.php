<?php

use WireKit\View\Components\Context\Menu;

describe('Context\\Menu', function () {

    describe('resolveMenuId()', function () {
        it('prefers an explicit id', function () {
            $menu = new Menu(id: 'context');

            expect($menu->resolveMenuId())->toBe('context');
        });

        it('falls back to the wire:key prefixed with menu- so morphs keep the id stable', function () {
            $menu = new Menu();

            expect($menu->resolveMenuId('context'))->toBe('menu-context');
        });

        it('prefers an explicit id over the wire:key', function () {
            $menu = new Menu(id: 'explicit');

            expect($menu->resolveMenuId('context'))->toBe('explicit');
        });

        it('prefixes the fallback id with menu-', function () {
            $menu = new Menu();

            expect($menu->resolveMenuId())->toStartWith('menu-');
        });

        it('generates unique ids across instances', function () {
            $a = new Menu();
            $b = new Menu();

            expect($a->resolveMenuId())->not->toBe($b->resolveMenuId());
        });
    });
});
