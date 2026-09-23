<?php

use WireKit\View\Components\Context\Index;

describe('Context\Index', function () {
    it('can be instantiated without arguments', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
