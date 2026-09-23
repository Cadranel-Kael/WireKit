<?php

use WireKit\View\Components\Editor\Content;

describe('Editor\Content', function () {
    it('can be instantiated with no arguments', function () {
        expect(new Content())->toBeInstanceOf(Content::class);
    });
});
