<?php

use WireKit\View\Components\TabList\Index;

describe('TabList\Index', function () {

    describe('defaults', function () {
        it('has an empty variant by default', function () {
            $tabList = new Index();

            expect($tabList->variant)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a variant', function () {
            $tabList = new Index(variant: 'line');

            expect($tabList->variant)->toBe('line');
        });
    });

    describe('getVariantClasses()', function () {
        it('resolves the line variant to an empty class', function () {
            $tabList = new Index(variant: 'line');

            expect($tabList->getVariantClasses())->toBe('');
        });

        it('falls back to the muted background class for any other variant', function () {
            $tabList = new Index();

            expect($tabList->getVariantClasses())->toBe('bg-muted rounded-auto-md');
        });
    });
});
