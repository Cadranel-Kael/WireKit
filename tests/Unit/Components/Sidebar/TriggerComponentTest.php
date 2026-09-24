<?php

use WireKit\View\Components\Sidebar\Trigger;

describe('Sidebar\Trigger', function () {

    describe('defaults', function () {
        it('targets "sidebar" by default', function () {
            $trigger = new Trigger();

            expect($trigger->for)->toBe('sidebar');
        });

        it('defaults the action to "toggle"', function () {
            $trigger = new Trigger();

            expect($trigger->action)->toBe('toggle');
        });
    });

    describe('props', function () {
        it('accepts a custom target id', function () {
            $trigger = new Trigger(for: 'app-sidebar');

            expect($trigger->for)->toBe('app-sidebar');
        });

        it('accepts an explicit open action', function () {
            $trigger = new Trigger(action: 'open');

            expect($trigger->action)->toBe('open');
        });

        it('accepts an explicit close action', function () {
            $trigger = new Trigger(action: 'close');

            expect($trigger->action)->toBe('close');
        });
    });
});
