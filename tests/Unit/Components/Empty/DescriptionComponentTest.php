<?php

use WireKit\View\Components\Empty\Description;

describe('Empty\Description', function () {
    it('can be instantiated with no props', function () {
        expect(new Description())->toBeInstanceOf(Description::class);
    });
});
