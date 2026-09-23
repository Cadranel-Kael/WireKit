<?php

use WireKit\View\Components\Heading\Index;

describe('Heading\Index', function () {
    describe('defaults', function () {
        it('has a null level by default', function () {
            $heading = new Index();

            expect($heading->level)->toBeNull();
        });

        it('defaults size to base', function () {
            $heading = new Index();

            expect($heading->size)->toBe('base');
            expect($heading->sizeClass)->toBe('text-base');
        });
    });

    describe('props', function () {
        it('accepts a level', function () {
            $heading = new Index(level: 2);

            expect($heading->level)->toBe(2);
        });
    });

    describe('sizeClass()', function () {
        it('resolves every named size', function () {
            $sizes = [
                'xs' => 'text-xs',
                'sm' => 'text-sm',
                'base' => 'text-base',
                'lg' => 'text-lg',
                'xl' => 'text-xl',
                '2xl' => 'text-2xl',
                '3xl' => 'text-3xl',
                '4xl' => 'text-4xl',
                '5xl' => 'text-5xl',
                '6xl' => 'text-6xl',
                '7xl' => 'text-7xl',
                '8xl' => 'text-8xl',
                '9xl' => 'text-9xl',
            ];

            foreach ($sizes as $size => $expected) {
                expect((new Index(size: $size))->sizeClass)->toBe($expected);
            }
        });

        it('falls back to an empty string for an unknown size', function () {
            $heading = new Index(size: 'huge');

            expect($heading->sizeClass)->toBe('');
        });
    });
});
