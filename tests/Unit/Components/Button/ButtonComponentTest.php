<?php

use WireKit\View\Components\Button\Button;

describe('Button\Button', function () {
    describe('defaults', function () {
        it('has an empty label by default', function () {
            $button = new Button();

            expect($button->label)->toBe('');
        });

        it('is not loading, square or inset by default', function () {
            $button = new Button();

            expect($button->loading)->toBeFalse();
            expect($button->square)->toBeFalse();
            expect($button->inset)->toBeFalse();
        });

        it('has empty variant, size, icon and color by default', function () {
            $button = new Button();

            expect($button->variant)->toBe('');
            expect($button->size)->toBe('');
            expect($button->icon)->toBe('');
            expect($button->color)->toBe('');
        });

        it('leaves colorClass empty when no color is given', function () {
            $button = new Button();

            expect($button->colorClass)->toBe('');
        });
    });

    describe('color', function () {
        it('derives a non-empty colorClass when a color is given', function () {
            $button = new Button(color: 'red');

            expect($button->colorClass)->not->toBe('');
        });
    });

    describe('variantClass()', function () {
        it('resolves primary, filled, danger, ghost, custom and default', function () {
            expect((new Button(variant: 'primary'))->variantClass())->toContain('bg-accent');
            expect((new Button(variant: 'filled'))->variantClass())->toContain('bg-fill');
            expect((new Button(variant: 'danger'))->variantClass())->toContain('bg-danger');
            expect((new Button(variant: 'ghost'))->variantClass())->toContain('bg-none');
            expect((new Button(variant: 'custom'))->variantClass())->toBe('');
            expect((new Button())->variantClass())->toContain('bg-white');
        });
    });

    describe('sizeClass()', function () {
        it('resolves xs and sm without inset', function () {
            expect((new Button(size: 'xs'))->sizeClass())->toBe('not-group-[.button-group]:h-6 px-2');
            expect((new Button(size: 'sm'))->sizeClass())->toBe('not-group-[.button-group]:h-8 px-2');
        });

        it('resolves the default size without inset', function () {
            expect((new Button())->sizeClass())->toBe('not-group-[.button-group]:h-9 px-3');
        });

        it('appends negative margins when inset is true', function () {
            expect((new Button(size: 'xs', inset: true))->sizeClass())
                ->toBe('not-group-[.button-group]:h-6 px-2 -mt-2 -me-2 -mb-2 -ms-2');
            expect((new Button(size: 'sm', inset: true))->sizeClass())
                ->toBe('not-group-[.button-group]:h-8 px-2 -mt-2 -me-2 -mb-2 -ms-2');
            expect((new Button(inset: true))->sizeClass())
                ->toBe('not-group-[.button-group]:h-9 px-3 -mt-3 -me-3 -mb-3 -ms-3');
        });
    });
});
