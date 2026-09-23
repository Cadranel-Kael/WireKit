<?php

use WireKit\View\Components\Icon\Index;

describe('Icon\Index', function () {
    describe('defaults', function () {
        it('has an empty name by default', function () {
            $icon = new Index();

            expect($icon->name)->toBe('');
        });

        it('defaults iconSet to lucide', function () {
            $icon = new Index();

            expect($icon->iconSet)->toBe('lucide');
        });
    });

    describe('props', function () {
        it('accepts a name and iconSet', function () {
            $icon = new Index(name: 'cog', iconSet: 'heroicons');

            expect($icon->name)->toBe('cog');
            expect($icon->iconSet)->toBe('heroicons');
        });
    });
});
