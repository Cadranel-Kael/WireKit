<?php

use WireKit\View\Components\Empty\Media;

describe('Empty\Media', function () {
    it('can be instantiated with no props', function () {
        expect(new Media())->toBeInstanceOf(Media::class);
    });
});
