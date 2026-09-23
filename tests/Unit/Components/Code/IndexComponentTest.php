<?php

use WireKit\View\Components\Code\Index;

describe('Code\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
