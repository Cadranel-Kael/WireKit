<?php

use WireKit\View\Components\Avatar\Index;

describe('Avatar\Index', function () {
    describe('defaults', function () {
        it('has empty src, name, initials, size and icon by default', function () {
            $avatar = new Index();

            expect($avatar->src)->toBe('');
            expect($avatar->name)->toBe('');
            expect($avatar->initials)->toBe('');
            expect($avatar->size)->toBe('');
            expect($avatar->icon)->toBe('');
        });

        it('defaults color to core', function () {
            $avatar = new Index();

            expect($avatar->color)->toBe('core');
        });

        it('is not a circle by default', function () {
            $avatar = new Index();

            expect($avatar->circle)->toBeFalse();
        });

        it('has an empty badge by default', function () {
            $avatar = new Index();

            expect($avatar->badge)->toBe('');
        });
    });

    describe('badge="1" shorthand', function () {
        it('converts a badge value of "1" into a bare dot (a single space)', function () {
            $avatar = new Index(badge: '1');

            expect($avatar->badge)->toBe(' ');
        });

        it('leaves other badge values untouched', function () {
            $avatar = new Index(badge: '3');

            expect($avatar->badge)->toBe('3');
        });
    });

    describe('sizeClass()', function () {
        it('resolves xs', function () {
            expect((new Index(size: 'xs'))->sizeClass())->toBe('w-6 h-6');
        });

        it('resolves sm', function () {
            expect((new Index(size: 'sm'))->sizeClass())->toBe('w-8 h-8');
        });

        it('resolves lg', function () {
            expect((new Index(size: 'lg'))->sizeClass())->toBe('w-12 h-12');
        });

        it('resolves xl', function () {
            expect((new Index(size: 'xl'))->sizeClass())->toBe('w-14 h-14');
        });

        it('falls back to the default (medium) size', function () {
            expect((new Index())->sizeClass())->toBe('w-10 h-10');
            expect((new Index(size: 'unknown'))->sizeClass())->toBe('w-10 h-10');
        });
    });

    describe('badgePositionClass()', function () {
        it('combines multiple positions', function () {
            $avatar = new Index();
            $attributes = new \Illuminate\View\ComponentAttributeBag(['badge:position' => 'top left']);

            expect($avatar->badgePositionClass($attributes))->toBe('top-0 left-0 ');
        });

        it('defaults to right bottom when no position attribute is given', function () {
            $avatar = new Index();
            $attributes = new \Illuminate\View\ComponentAttributeBag();

            expect($avatar->badgePositionClass($attributes))->toBe('right-0 bottom-0 ');
        });
    });

    describe('badgeVariantClass()', function () {
        it('adds a solid white dot with rounded corners by default for outline variant', function () {
            $avatar = new Index();
            $attributes = new \Illuminate\View\ComponentAttributeBag(['badge:variant' => 'outline']);

            expect($avatar->badgeVariantClass($attributes))->toBe('after:h-2 after:w-2 after:bg-white after:rounded');
        });

        it('uses a circular dot when badge:circle is set', function () {
            $avatar = new Index();
            $attributes = new \Illuminate\View\ComponentAttributeBag(['badge:variant' => 'outline', 'badge:circle' => true]);

            expect($avatar->badgeVariantClass($attributes))->toBe('after:h-2 after:w-2 after:bg-white after:rounded-full');
        });

        it('is empty for the default (white) variant', function () {
            $avatar = new Index();
            $attributes = new \Illuminate\View\ComponentAttributeBag();

            expect($avatar->badgeVariantClass($attributes))->toBe('');
        });
    });
});
