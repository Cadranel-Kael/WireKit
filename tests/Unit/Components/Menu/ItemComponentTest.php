<?php

use WireKit\View\Components\Menu\Item;

describe('Menu\Item', function () {

    describe('defaults', function () {
        it('has empty icon, id, shortcut and href by default', function () {
            $item = new Item();

            expect($item->icon)->toBe('');
            expect($item->id)->toBe('');
            expect($item->shortcut)->toBe('');
            expect($item->href)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts icon, id, shortcut and href together', function () {
            $item = new Item(
                icon: 'trash',
                id: 'delete-item',
                shortcut: '⌘⌫',
                href: '/delete',
            );

            expect($item->icon)->toBe('trash');
            expect($item->id)->toBe('delete-item');
            expect($item->shortcut)->toBe('⌘⌫');
            expect($item->href)->toBe('/delete');
        });
    });
});
