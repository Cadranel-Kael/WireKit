<?php

use WireKit\View\Components\Accordion\Group;

describe('Accordion\Group', function () {

    describe('defaults', function () {
        it('is not exclusive by default', function () {
            $group = new Group();

            expect($group->exclusive)->toBeFalse();
        });

        it('has transitions disabled by default', function () {
            $group = new Group();

            expect($group->transition)->toBeFalse();
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

        it('can have transitions enabled', function () {
            $group = new Group(transition: true);

            expect($group->transition)->toBeTrue();
        });

        it('accepts both exclusive and transition together', function () {
            $group = new Group(exclusive: true, transition: true);

            expect($group->exclusive)->toBeTrue();
            expect($group->transition)->toBeTrue();
        });
    });
});
