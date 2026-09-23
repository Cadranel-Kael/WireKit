<?php

use WireKit\View\Components\Input\Group\Suffix;

describe('Input\Group\Suffix', function () {
    it('constructs without arguments', function () {
        expect(new Suffix())->toBeInstanceOf(Suffix::class);
    });
});
