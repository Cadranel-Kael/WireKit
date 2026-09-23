<?php

use WireKit\View\Components\Text\Index;

describe('Text\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
