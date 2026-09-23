<?php

use WireKit\View\Components\Editor\Toolbar;

describe('Editor\Toolbar', function () {
    it('can be instantiated with no arguments', function () {
        expect(new Toolbar())->toBeInstanceOf(Toolbar::class);
    });
});
