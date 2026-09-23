<?php

use WireKit\View\Components\Spacer\Index;

describe('Spacer\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
