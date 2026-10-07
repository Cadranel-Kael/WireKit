<?php

use WireKit\View\Components\Tabs\Index;

describe('Tabs\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
