<?php

use WireKit\View\Components\Table\Row;

describe('Table\Row', function () {
    it('can be instantiated with no props', function () {
        expect(new Row())->toBeInstanceOf(Row::class);
    });
});
