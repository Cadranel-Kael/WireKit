<?php

use WireKit\View\Components\Table\Rows;

describe('Table\Rows', function () {
    it('can be instantiated with no props', function () {
        expect(new Rows())->toBeInstanceOf(Rows::class);
    });
});
