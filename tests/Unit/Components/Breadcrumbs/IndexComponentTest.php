<?php

use WireKit\View\Components\Breadcrumbs\Index;

describe('Breadcrumbs\Index', function () {
    it('can be instantiated with no props', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
