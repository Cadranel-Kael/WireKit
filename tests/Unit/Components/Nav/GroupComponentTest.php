<?php

use WireKit\View\Components\Nav\Group;

describe('Nav\Group', function () {
    describe('defaults', function () {
        it('has an empty heading by default', function () {
            $group = new Group();

            expect($group->heading)->toBe('');
        });

        it('is not collapsible by default', function () {
            $group = new Group();

            expect($group->collapsible)->toBeFalse();
        });

        it('is collapsed by default', function () {
            $group = new Group();

            expect($group->collapsed)->toBeTrue();
        });
    });

    describe('props', function () {
        it('accepts all props together', function () {
            $group = new Group(heading: 'Settings', collapsible: true, collapsed: false);

            expect($group->heading)->toBe('Settings');
            expect($group->collapsible)->toBeTrue();
            expect($group->collapsed)->toBeFalse();
        });
    });
});
