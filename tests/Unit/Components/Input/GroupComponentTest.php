<?php

use WireKit\View\Components\Input\Group;

describe('Input\Group', function () {

    describe('defaults', function () {
        it('is in a group by default', function () {
            $group = new Group();

            expect($group->isInGroup)->toBeTrue();
        });
    });

    describe('props', function () {
        it('can opt out of being in a group', function () {
            $group = new Group(isInGroup: false);

            expect($group->isInGroup)->toBeFalse();
        });
    });
});
