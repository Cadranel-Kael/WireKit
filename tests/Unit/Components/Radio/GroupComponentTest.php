<?php

use WireKit\View\Components\Radio\Group;

describe('Radio\Group', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $group = new Group();

            expect($group->label)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a label', function () {
            $group = new Group(label: 'Plan');

            expect($group->label)->toBe('Plan');
        });
    });
});
