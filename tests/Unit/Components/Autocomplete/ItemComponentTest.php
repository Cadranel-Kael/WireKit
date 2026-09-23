<?php

use WireKit\View\Components\Autocomplete\Item;

describe('Autocomplete\Item', function () {
    it('can be instantiated with no props', function () {
        expect(new Item())->toBeInstanceOf(Item::class);
    });
});
