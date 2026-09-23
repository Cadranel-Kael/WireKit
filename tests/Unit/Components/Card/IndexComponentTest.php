<?php

use WireKit\View\Components\Card\Index;

describe('Card\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
