<?php

use WireKit\View\Components\Accordion\Heading;

describe('Accordion\Heading', function () {
    it('can be instantiated with no props', function () {
        expect(new Heading())->toBeInstanceOf(Heading::class);
    });
});
