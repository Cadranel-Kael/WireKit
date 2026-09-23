<?php

use WireKit\View\Components\Fieldset\Index;

describe('Fieldset\Index', function () {
    it('constructs without arguments', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });
});
