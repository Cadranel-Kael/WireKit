<?php

use WireKit\View\Components\Button\Index;

describe('Button\Index', function () {
    describe('defaults', function () {
        it('defaults as to button', function () {
            $button = new Index();

            expect($button->as)->toBe('button');
        });

        it('has empty href, label, variant, size, icon, color and tooltip by default', function () {
            $button = new Index();

            expect($button->href)->toBe('');
            expect($button->label)->toBe('');
            expect($button->variant)->toBe('');
            expect($button->size)->toBe('');
            expect($button->icon)->toBe('');
            expect($button->color)->toBe('');
            expect($button->tooltip)->toBe('');
        });

        it('is not loading, square or inset by default', function () {
            $button = new Index();

            expect($button->loading)->toBeFalse();
            expect($button->square)->toBeFalse();
            expect($button->inset)->toBeFalse();
        });

        it('leaves colorClass empty when no color is given', function () {
            $button = new Index();

            expect($button->colorClass)->toBe('');
        });
    });

    describe('color', function () {
        it('derives a non-empty colorClass when a color is given', function () {
            $button = new Index(color: 'red');

            expect($button->colorClass)->not->toBe('');
        });
    });

    describe('variantClass()', function () {
        it('resolves primary, filled, danger, ghost, custom and default', function () {
            expect((new Index(variant: 'primary'))->variantClass())->toContain('bg-accent');
            expect((new Index(variant: 'filled'))->variantClass())->toContain('bg-fill');
            expect((new Index(variant: 'danger'))->variantClass())->toContain('bg-danger');
            expect((new Index(variant: 'ghost'))->variantClass())->toBe('bg-none text-foreground hover:bg-muted');
            expect((new Index(variant: 'custom'))->variantClass())->toBe('');
            expect((new Index())->variantClass())->toContain('bg-background');
        });
    });

    describe('sizeClass()', function () {
        it('resolves xs and sm without inset', function () {
            expect((new Index(size: 'xs'))->sizeClass())->toBe('not-group-[.button-group]:h-6 px-2');
            expect((new Index(size: 'sm'))->sizeClass())->toBe('not-group-[.button-group]:h-8 px-2');
        });

        it('resolves the default size without inset', function () {
            expect((new Index())->sizeClass())->toBe('not-group-[.button-group]:h-9 px-3');
        });

        it('appends negative margins when inset is true', function () {
            expect((new Index(size: 'xs', inset: true))->sizeClass())
                ->toBe('not-group-[.button-group]:h-6 px-2 -mt-2 -me-2 -mb-2 -ms-2');
            expect((new Index(inset: true))->sizeClass())
                ->toBe('not-group-[.button-group]:h-9 px-3 -mt-3 -me-3 -mb-3 -ms-3');
        });
    });
});
