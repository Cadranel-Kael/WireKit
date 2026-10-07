<?php

use WireKit\View\Components\Empty\Icon;

describe('Empty\Icon', function () {

    describe('props', function () {
        it('accepts a name', function () {
            $icon = new Icon(name: 'inbox');

            expect($icon->name)->toBe('inbox');
        });
    });
});
