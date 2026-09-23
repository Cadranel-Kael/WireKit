<?php

use WireKit\View\Components\Fieldset\Row;

describe('Fieldset\Row', function () {
    it('constructs without arguments', function () {
        expect(new Row())->toBeInstanceOf(Row::class);
    });
});
