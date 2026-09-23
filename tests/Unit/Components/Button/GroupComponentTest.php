<?php

use WireKit\View\Components\Button\Group;

describe('Button\Group', function () {
    describe('defaults', function () {
        it('is in a group by default', function () {
            $group = new Group();

            expect($group->inGroup)->toBeTrue();
        });
    });

    describe('props', function () {
        it('can be set to not be in a group', function () {
            $group = new Group(inGroup: false);

            expect($group->inGroup)->toBeFalse();
        });
    });
});
