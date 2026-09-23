<?php

use WireKit\View\Components\Header\Index;

describe('Header\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
