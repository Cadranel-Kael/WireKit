<?php

use WireKit\View\Components\Combobox\Index;

describe('Combobox\Index', function () {
    it('constructs without arguments', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
