<?php

use WireKit\View\Components\Toggle\Group;

describe('Toggle\Group', function () {

    describe('defaults', function () {
        it('is not exclusive by default', function () {
            $group = new Group();

            expect($group->exclusive)->toBeFalse();
        });
    });

    describe('auto-generated group id', function () {
        it('generates a non-empty group id', function () {
            $group = new Group();

            expect($group->groupId)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the group id with group-', function () {
            $group = new Group();

            expect($group->groupId)->toStartWith('group-');
        });

        it('generates unique group ids across instances', function () {
            $a = new Group();
            $b = new Group();

            expect($a->groupId)->not->toBe($b->groupId);
        });
    });

    describe('props', function () {
        it('can be set as exclusive', function () {
            $group = new Group(exclusive: true);

            expect($group->exclusive)->toBeTrue();
        });
    });
});
