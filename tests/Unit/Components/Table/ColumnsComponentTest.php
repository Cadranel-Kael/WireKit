<?php

use WireKit\View\Components\Table\Columns;

describe('Table\Columns', function () {
    it('can be instantiated with no props', function () {
        expect(new Columns())->toBeInstanceOf(Columns::class);
    });
});
