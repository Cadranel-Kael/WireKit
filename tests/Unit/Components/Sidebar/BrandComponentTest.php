<?php

use WireKit\View\Components\Sidebar\Brand;

describe('Sidebar\Brand', function () {

    describe('defaults', function () {
        it('defaults the href to #', function () {
            $brand = new Brand();

            expect($brand->href)->toBe('#');
        });

        it('has an empty logo by default', function () {
            $brand = new Brand();

            expect($brand->logo)->toBe('');
        });

        it('has an empty name by default', function () {
            $brand = new Brand();

            expect($brand->name)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts href, logo and name together', function () {
            $brand = new Brand(href: '/', logo: '/logo.svg', name: 'WireKit');

            expect($brand->href)->toBe('/');
            expect($brand->logo)->toBe('/logo.svg');
            expect($brand->name)->toBe('WireKit');
        });
    });
});
