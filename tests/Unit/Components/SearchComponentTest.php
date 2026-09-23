<?php

use WireKit\View\Components\Search;

describe('Search', function () {
    describe('defaults', function () {
        it('defaults the placeholder to "Search"', function () {
            $search = new Search();

            expect($search->placeholder)->toBe('Search');
        });
    });

    describe('props', function () {
        it('accepts a custom placeholder', function () {
            $search = new Search(placeholder: 'Find a page...');

            expect($search->placeholder)->toBe('Find a page...');
        });
    });
});
