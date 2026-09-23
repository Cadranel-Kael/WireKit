<?php

use WireKit\View\Components\Legend\Index;

describe('Legend\Index', function () {
    it('constructs without arguments', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
