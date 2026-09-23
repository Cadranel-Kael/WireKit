<?php

use WireKit\View\Components\Sidebar\Search;

describe('Sidebar\Search', function () {
    it('can be instantiated with no props', function () {
        expect(new Search())->toBeInstanceOf(Search::class);
    });
});
