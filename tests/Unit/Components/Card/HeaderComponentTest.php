<?php

use WireKit\View\Components\Card\Header;

describe('Card\Header', function () {
    it('can be instantiated with no props', function () {
        expect(new Header())->toBeInstanceOf(Header::class);
    });
});
