<?php

use WireKit\View\Components\Nav\Item;

describe('Nav\Item', function () {
    // NOTE: when $current is false, the constructor calls the `url()` helper
    // to auto-detect whether the item matches the current request, which
    // requires a booted Laravel application. This Pest suite runs without
    // one (see tests/Pest.php), so only the $current: true path — which
    // skips that call — is exercised here.

    describe('props (current: true, skips URL auto-detection)', function () {
        it('accepts an href and icon', function () {
            $item = new Item(href: '/settings', current: true, icon: 'cog');

            expect($item->href)->toBe('/settings');
            expect($item->icon)->toBe('cog');
        });

        it('stays current when explicitly marked current', function () {
            $item = new Item(href: '/settings', current: true);

            expect($item->current)->toBeTrue();
        });

        it('defaults href to # and icon to empty', function () {
            $item = new Item(current: true);

            expect($item->href)->toBe('#');
            expect($item->icon)->toBe('');
        });
    });
});
