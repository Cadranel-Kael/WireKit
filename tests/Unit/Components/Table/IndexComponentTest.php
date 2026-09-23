<?php

use WireKit\View\Components\Table\Index;

describe('Table\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
