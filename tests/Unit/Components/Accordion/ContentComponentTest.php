<?php

use WireKit\View\Components\Accordion\Content;

describe('Accordion\Content', function () {
    it('can be instantiated with no props', function () {
        expect(new Content())->toBeInstanceOf(Content::class);
    });
});
