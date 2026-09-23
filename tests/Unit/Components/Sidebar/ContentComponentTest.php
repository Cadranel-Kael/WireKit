<?php

use WireKit\View\Components\Sidebar\Content;

describe('Sidebar\Content', function () {
    it('can be instantiated with no props', function () {
        expect(new Content())->toBeInstanceOf(Content::class);
    });
});
