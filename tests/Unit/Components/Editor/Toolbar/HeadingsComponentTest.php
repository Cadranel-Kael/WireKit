<?php

use WireKit\View\Components\Editor\Toolbar\Headings;

describe('Editor\Toolbar\Headings', function () {

    describe('defaults', function () {
        it('defaults to headings 1, 2 and 3', function () {
            $headings = new Headings();

            expect($headings->headings)->toBe([1, 2, 3]);
        });
    });

    describe('props', function () {
        it('accepts a custom headings array', function () {
            $headings = new Headings(headings: [1, 2]);

            expect($headings->headings)->toBe([1, 2]);
        });
    });
});
