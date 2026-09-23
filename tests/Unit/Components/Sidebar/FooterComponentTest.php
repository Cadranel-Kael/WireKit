<?php

use WireKit\View\Components\Sidebar\Footer;

describe('Sidebar\Footer', function () {
    it('can be instantiated with no props', function () {
        expect(new Footer())->toBeInstanceOf(Footer::class);
    });
});
