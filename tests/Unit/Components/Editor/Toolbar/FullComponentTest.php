<?php

use WireKit\View\Components\Editor\Toolbar\Full;

describe('Editor\Toolbar\Full', function () {

    describe('defaults', function () {
        it('defaults to headings 2 and 3', function () {
            $full = new Full();

            expect($full->headings)->toBe([2, 3]);
        });
    });

    describe('props', function () {
        it('accepts a custom headings array', function () {
            $full = new Full(headings: [1, 2, 3, 4]);

            expect($full->headings)->toBe([1, 2, 3, 4]);
        });
    });
});
