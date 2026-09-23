<?php

use WireKit\View\Components\Navbar\Index;

describe('Navbar\Index', function () {
    describe('defaults', function () {
        it('does not show the app title by default', function () {
            $navbar = new Index();

            expect($navbar->appTitle)->toBeFalse();
        });
    });

    describe('props', function () {
        it('can show the app title', function () {
            $navbar = new Index(appTitle: true);

            expect($navbar->appTitle)->toBeTrue();
        });
    });
});
