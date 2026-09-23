<?php

use WireKit\View\Components\Modal\Trigger;

describe('Modal\Trigger', function () {

    describe('defaults', function () {
        it('has an empty name by default', function () {
            $trigger = new Trigger();

            expect($trigger->name)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a name', function () {
            $trigger = new Trigger(name: 'confirm-delete');

            expect($trigger->name)->toBe('confirm-delete');
        });
    });
});
