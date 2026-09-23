<?php

use WireKit\View\Components\Alert\Description;

describe('Alert\Description', function () {
    it('can be instantiated with no props', function () {
        expect(new Description())->toBeInstanceOf(Description::class);
    });
});
