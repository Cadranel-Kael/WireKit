<?php

use WireKit\View\Components\Avatar\Group;

describe('Avatar\Group', function () {
    it('can be instantiated with no props', function () {
        expect(new Group())->toBeInstanceOf(Group::class);
    });
});
