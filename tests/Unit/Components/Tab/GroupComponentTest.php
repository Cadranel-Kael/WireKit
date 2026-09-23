<?php

use WireKit\View\Components\Tab\Group;

describe('Tab\Group', function () {

    describe('auto-generated group id', function () {
        it('generates a non-empty group id when none is given', function () {
            $group = new Group();

            expect($group->groupId)->toBeString()->not->toBeEmpty();
        });

        it('generates unique group ids across instances', function () {
            $a = new Group();
            $b = new Group();

            expect($a->groupId)->not->toBe($b->groupId);
        });
    });

    describe('explicit id', function () {
        it('uses the given id as the group id', function () {
            $group = new Group(id: 'settings-tabs');

            expect($group->groupId)->toBe('settings-tabs');
        });
    });
});
