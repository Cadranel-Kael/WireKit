<?php

use WireKit\View\Components\Nav\Index;

describe('Nav\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
