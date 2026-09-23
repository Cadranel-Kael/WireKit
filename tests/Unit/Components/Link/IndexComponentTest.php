<?php

use WireKit\View\Components\Link\Index;

describe('Link\Index', function () {
    describe('defaults', function () {
        it('has an empty href and variant by default', function () {
            $link = new Index();

            expect($link->href)->toBe('');
            expect($link->variant)->toBe('');
        });
    });

    describe('variantClass()', function () {
        it('resolves subtle', function () {
            expect((new Index(variant: 'subtle'))->variantClass())->toContain('text-muted-foreground');
        });

        it('falls back to the underlined default for any other variant', function () {
            expect((new Index())->variantClass())->toContain('underline');
            expect((new Index(variant: 'other'))->variantClass())->toContain('underline');
        });
    });
});
