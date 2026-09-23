<?php

use Illuminate\View\ComponentAttributeBag;
use WireKit\View\Components\Checkbox\Group;

describe('Checkbox\Group', function () {

    describe('defaults', function () {
        it('has an empty legend by default', function () {
            $group = new Group();

            expect($group->legend)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a legend', function () {
            $group = new Group(legend: 'Preferences');

            expect($group->legend)->toBe('Preferences');
        });
    });

    describe('descriptionPosition()', function () {
        it('returns the description:position attribute when present', function () {
            $group = new Group();
            $attributes = new ComponentAttributeBag(['description:position' => 'inline']);

            expect($group->descriptionPosition($attributes))->toBe('inline');
        });

        it('defaults to block', function () {
            $group = new Group();
            $attributes = new ComponentAttributeBag();

            expect($group->descriptionPosition($attributes))->toBe('block');
        });
    });
});
