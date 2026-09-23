<?php

use WireKit\View\Components\Separator\Index;

describe('Separator\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
