<?php

use WireKit\View\Components\Main\Index;

describe('Main\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
