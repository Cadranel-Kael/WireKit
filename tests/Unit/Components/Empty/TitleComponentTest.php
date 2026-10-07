<?php

use WireKit\View\Components\Empty\Title;

describe('Empty\Title', function () {
    it('can be instantiated with no props', function () {
        expect(new Title())->toBeInstanceOf(Title::class);
    });
});
