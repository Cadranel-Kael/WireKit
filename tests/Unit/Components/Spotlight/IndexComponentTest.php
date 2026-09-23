<?php

use WireKit\View\Components\Spotlight\Index;

describe('Spotlight\Index', function () {
    describe('defaults', function () {
        it('defaults the button label to "Search"', function () {
            $spotlight = new Index();

            expect($spotlight->button)->toBe('Search');
        });

        it('shows the icon by default', function () {
            $spotlight = new Index();

            expect($spotlight->icon)->toBeTrue();
        });

        it('defaults the placeholder to "Search..."', function () {
            $spotlight = new Index();

            expect($spotlight->placeholder)->toBe('Search...');
        });
    });

    describe('props', function () {
        it('accepts all props together', function () {
            $spotlight = new Index(button: 'Find', icon: false, placeholder: 'Type to search');

            expect($spotlight->button)->toBe('Find');
            expect($spotlight->icon)->toBeFalse();
            expect($spotlight->placeholder)->toBe('Type to search');
        });
    });
});
