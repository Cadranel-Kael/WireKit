<?php

use WireKit\View\Components\Select\Select;

describe('Select\Select', function () {
    it('constructs without arguments', function () {
        expect(new Select())->toBeInstanceOf(Select::class);
    });
});
