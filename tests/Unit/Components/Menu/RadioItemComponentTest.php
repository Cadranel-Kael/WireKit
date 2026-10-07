<?php

use WireKit\View\Components\Menu\RadioItem;

describe('Menu\RadioItem', function () {

    describe('defaults', function () {
        it('is not active and has an empty shortcut by default', function () {
            $radioItem = new RadioItem();

            expect($radioItem->active)->toBeFalse();
            expect($radioItem->shortcut)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts active and shortcut together', function () {
            $radioItem = new RadioItem(active: true, shortcut: '⌘1');

            expect($radioItem->active)->toBeTrue();
            expect($radioItem->shortcut)->toBe('⌘1');
        });
    });
});
