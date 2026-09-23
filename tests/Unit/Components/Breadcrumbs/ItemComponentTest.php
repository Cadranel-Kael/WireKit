<?php

use WireKit\View\Components\Breadcrumbs\Item;

describe('Breadcrumbs\Item', function () {
    describe('defaults', function () {
        it('has an empty href and icon by default', function () {
            $item = new Item();

            expect($item->href)->toBe('');
            expect($item->icon)->toBe('');
        });

        it('defaults the separator to chevron-right', function () {
            $item = new Item();

            expect($item->separator)->toBe('chevron-right');
        });

        it('defaults the icon variant to outline', function () {
            $item = new Item();

            expect($item->iconVariant)->toBe('outline');
        });
    });

    describe('props', function () {
        it('accepts all props together', function () {
            $item = new Item(
                href: '/settings',
                separator: 'slash',
                icon: 'cog',
                iconVariant: 'solid',
            );

            expect($item->href)->toBe('/settings');
            expect($item->separator)->toBe('slash');
            expect($item->icon)->toBe('cog');
            expect($item->iconVariant)->toBe('solid');
        });
    });
});
