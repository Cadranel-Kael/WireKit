<?php

use WireKit\View\Components\Badge\Close;

describe('Badge\Close', function () {
    it('can be instantiated with no props', function () {
        expect(new Close())->toBeInstanceOf(Close::class);
    });
});
