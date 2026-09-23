<?php

use WireKit\View\Components\Autocomplete\Index;

describe('Autocomplete\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
