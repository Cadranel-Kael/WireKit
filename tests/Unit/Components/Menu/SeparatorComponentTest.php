<?php

use WireKit\View\Components\Menu\Separator;

describe('Menu\Separator', function () {
    it('can be instantiated without arguments', function () {
        expect(new Separator())->toBeInstanceOf(Separator::class);
    });
});
