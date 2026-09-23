<?php

use WireKit\View\Components\Badge\Index;

describe('Badge\Index', function () {
    describe('defaults', function () {
        it('defaults color to core', function () {
            $badge = new Index();

            expect($badge->color)->toBe('core');
        });

        it('has empty colorVariant, size, variant, icon, iconRight and as by default', function () {
            $badge = new Index();

            expect($badge->colorVariant)->toBe('');
            expect($badge->size)->toBe('');
            expect($badge->variant)->toBe('');
            expect($badge->icon)->toBe('');
            expect($badge->iconRight)->toBe('');
            expect($badge->as)->toBe('');
        });

        it('is not a dot by default', function () {
            expect((new Index())->dot)->toBeFalse();
        });
    });

    describe('dotColorClass', function () {
        it('is always the solid variant of the color, regardless of colorVariant', function () {
            $badge = new Index(color: 'success', colorVariant: 'border', dot: true);

            expect($badge->dotColorClass)->toBe('text-success-foreground bg-success');
        });
    });

    describe('variantClass()', function () {
        it('resolves pill', function () {
            expect((new Index(variant: 'pill'))->variantClass())->toBe('rounded-full');
        });

        it('falls back to rounded for any other variant', function () {
            expect((new Index())->variantClass())->toBe('rounded');
            expect((new Index(variant: 'square'))->variantClass())->toBe('rounded');
        });
    });

    describe('sizeClass()', function () {
        it('resolves small, non-pill', function () {
            expect((new Index(size: 'sm'))->sizeClass())->toBe('text-xs py-1 px-2');
        });

        it('resolves small pill', function () {
            expect((new Index(size: 'sm', variant: 'pill'))->sizeClass())->toBe('text-xs py-1 px-4');
        });

        it('resolves large ("l"), non-pill', function () {
            expect((new Index(size: 'l'))->sizeClass())->toBe('text-sm py-1.5 px-2');
        });

        it('resolves large ("l") pill', function () {
            expect((new Index(size: 'l', variant: 'pill'))->sizeClass())->toBe('text-sm py-1.5 px-4');
        });

        it('resolves the default size, non-pill', function () {
            expect((new Index())->sizeClass())->toBe('text-sm py-1 px-2');
        });

        it('resolves the default size, pill', function () {
            expect((new Index(variant: 'pill'))->sizeClass())->toBe('text-sm py-1 px-4');
        });
    });
});
