<?php

use WireKit\View\Components\Empty\Content;

describe('Empty\Content', function () {
    it('can be instantiated with no props', function () {
        expect(new Content())->toBeInstanceOf(Content::class);
    });
});
