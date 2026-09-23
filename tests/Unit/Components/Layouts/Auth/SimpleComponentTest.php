<?php

use WireKit\View\Components\Layouts\Auth\Simple;

describe('Layouts\Auth\Simple', function () {
    it('can be instantiated with no props', function () {
        expect(new Simple())->toBeInstanceOf(Simple::class);
    });
});
