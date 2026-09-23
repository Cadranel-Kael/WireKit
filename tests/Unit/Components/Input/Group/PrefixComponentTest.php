<?php

use WireKit\View\Components\Input\Group\Prefix;

describe('Input\Group\Prefix', function () {
    it('constructs without arguments', function () {
        expect(new Prefix())->toBeInstanceOf(Prefix::class);
    });
});
