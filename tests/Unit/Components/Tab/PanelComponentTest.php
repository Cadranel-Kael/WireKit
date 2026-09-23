<?php

use WireKit\View\Components\Tab\Panel;

describe('Tab\Panel', function () {

    describe('defaults', function () {
        it('has an empty name by default', function () {
            $panel = new Panel();

            expect($panel->name)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a name', function () {
            $panel = new Panel(name: 'general');

            expect($panel->name)->toBe('general');
        });
    });
});
