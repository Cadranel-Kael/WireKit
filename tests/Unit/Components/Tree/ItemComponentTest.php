<?php

use WireKit\View\Components\Tree\Item;

describe('Tree\Item', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $item = new Item();

            expect($item->label)->toBe('');
        });

        it('has an empty icon by default', function () {
            $item = new Item();

            expect($item->icon)->toBe('');
        });

        it('is collapsed by default', function () {
            $item = new Item();

            expect($item->expanded)->toBeFalse();
        });

        it('is enabled by default', function () {
            $item = new Item();

            expect($item->disabled)->toBeFalse();
        });

        it('has no href by default', function () {
            $item = new Item();

            expect($item->href)->toBeNull();
        });
    });

    describe('props', function () {
        it('accepts a label, icon, expanded, disabled and href', function () {
            $item = new Item(
                label: 'src',
                icon: 'folder',
                expanded: true,
                disabled: true,
                href: '/src',
            );

            expect($item->label)->toBe('src');
            expect($item->icon)->toBe('folder');
            expect($item->expanded)->toBeTrue();
            expect($item->disabled)->toBeTrue();
            expect($item->href)->toBe('/src');
        });
    });

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $item = new Item();

            expect($item->id)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the id with tree-item-', function () {
            $item = new Item();

            expect($item->id)->toStartWith('tree-item-');
        });

        it('generates unique ids across instances', function () {
            $a = new Item();
            $b = new Item();

            expect($a->id)->not->toBe($b->id);
        });
    });
});
