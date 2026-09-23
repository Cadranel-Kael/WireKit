<?php

use WireKit\View\Components\Toggle\Index;

describe('Toggle\Index', function () {

    describe('defaults', function () {
        it('has an empty icon by default', function () {
            $toggle = new Index();

            expect($toggle->icon)->toBe('');
        });

        it('has an empty variant by default', function () {
            $toggle = new Index();

            expect($toggle->variant)->toBe('');
        });

        it('has an empty size by default', function () {
            $toggle = new Index();

            expect($toggle->size)->toBe('');
        });

        it('is not active by default', function () {
            $toggle = new Index();

            expect($toggle->active)->toBeFalse();
        });
    });

    describe('props', function () {
        it('accepts icon, variant, size and active', function () {
            $toggle = new Index(icon: 'bold', variant: 'outline', size: 'sm', active: true);

            expect($toggle->icon)->toBe('bold');
            expect($toggle->variant)->toBe('outline');
            expect($toggle->size)->toBe('sm');
            expect($toggle->active)->toBeTrue();
        });
    });

    describe('variantClasses()', function () {
        it('adds a border for the outline variant', function () {
            $toggle = new Index(variant: 'outline');

            expect($toggle->variantClasses())->toBe('border border-border');
        });

        it('is empty for the default variant', function () {
            $toggle = new Index();

            expect($toggle->variantClasses())->toBe('');
        });
    });

    describe('sizeClasses()', function () {
        it('resolves small size classes', function () {
            $toggle = new Index(size: 'sm');

            expect($toggle->sizeClasses())->toContain('h-6');
        });

        it('resolves large size classes', function () {
            $toggle = new Index(size: 'lg');

            expect($toggle->sizeClasses())->toContain('h-10');
        });

        it('resolves default size classes', function () {
            $toggle = new Index();

            expect($toggle->sizeClasses())->toContain('h-8');
        });
    });

    describe('iconSize()', function () {
        it('is 4 for small', function () {
            $toggle = new Index(size: 'sm');

            expect($toggle->iconSize())->toBe('4');
        });

        it('is 5 for large', function () {
            $toggle = new Index(size: 'lg');

            expect($toggle->iconSize())->toBe('5');
        });

        it('is 5 by default', function () {
            $toggle = new Index();

            expect($toggle->iconSize())->toBe('5');
        });
    });
});
