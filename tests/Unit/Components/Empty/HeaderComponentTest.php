<?php

use WireKit\View\Components\Empty\Header;

describe('Empty\Header', function () {
    it('can be instantiated with no props', function () {
        expect(new Header())->toBeInstanceOf(Header::class);
    });
});
