<?php

use WireKit\View\Components\Navbar\Item;

describe('Navbar\Item', function () {
    // NOTE: when $current is false, the constructor calls the `url()` helper
    // to auto-detect whether the item matches the current request, which
    // requires a booted Laravel application. This Pest suite runs without
    // one (see tests/Pest.php), so only the $current: true path — which
    // skips that call — is exercised here.

    describe('props (current: true, skips URL auto-detection)', function () {
        it('accepts an href', function () {
            $item = new Item(href: '/settings', current: true);

            expect($item->href)->toBe('/settings');
        });

        it('stays current when explicitly marked current', function () {
            $item = new Item(href: '/settings', current: true);

            expect($item->current)->toBeTrue();
        });

        it('defaults href to #', function () {
            $item = new Item(current: true);

            expect($item->href)->toBe('#');
        });
    });
});
