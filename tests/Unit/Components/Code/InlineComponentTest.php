<?php

use WireKit\View\Components\Code\Inline;

describe('Code\Inline', function () {
    it('can be instantiated with no props', function () {
        expect(new Inline())->toBeInstanceOf(Inline::class);
    });
});
