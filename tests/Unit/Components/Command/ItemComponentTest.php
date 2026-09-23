<?php

use WireKit\View\Components\Command\Item;

describe('Command\Item', function () {

    describe('defaults', function () {
        it('has an empty icon by default', function () {
            $item = new Item();

            expect($item->icon)->toBe('');
        });

        it('has an empty kbd by default', function () {
            $item = new Item();

            expect($item->kbd)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts an icon and kbd shortcut', function () {
            $item = new Item(icon: 'file', kbd: '⌘K');

            expect($item->icon)->toBe('file');
            expect($item->kbd)->toBe('⌘K');
        });
    });
});
