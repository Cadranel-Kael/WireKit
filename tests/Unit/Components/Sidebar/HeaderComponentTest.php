<?php

use WireKit\View\Components\Sidebar\Header;

describe('Sidebar\Header', function () {
    it('can be instantiated with no props', function () {
        expect(new Header())->toBeInstanceOf(Header::class);
    });
});
