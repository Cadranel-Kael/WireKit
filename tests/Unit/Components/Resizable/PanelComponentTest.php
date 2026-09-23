<?php

use WireKit\View\Components\Resizable\Panel;

describe('Resizable\Panel', function () {

    describe('defaults', function () {
        it('defaults to size 50', function () {
            $panel = new Panel();

            expect($panel->defaultSize)->toBe('50');
        });

        it('resolves the default size to a flex-grow ratio', function () {
            $panel = new Panel();

            expect($panel->flexStyle())->toBe('50 1 0%');
        });
    });

    describe('flexStyle()', function () {
        it('treats an int as a fixed pixel size', function () {
            $panel = new Panel(defaultSize: 200);

            expect($panel->flexStyle())->toBe('0 0 200px');
        });

        it('treats a unitless numeric string as a flex-grow ratio', function () {
            $panel = new Panel(defaultSize: '30');

            expect($panel->flexStyle())->toBe('30 1 0%');
        });

        it('treats a percentage string the same as a unitless ratio', function () {
            $panel = new Panel(defaultSize: '30%');

            expect($panel->flexStyle())->toBe('30 1 0%');
        });

        it('treats a pixel string as a fixed size', function () {
            $panel = new Panel(defaultSize: '250px');

            expect($panel->flexStyle())->toBe('0 0 250px');
        });

        it('treats a rem string as a fixed size', function () {
            $panel = new Panel(defaultSize: '12rem');

            expect($panel->flexStyle())->toBe('0 0 12rem');
        });

        it('treats a vh string as a fixed size', function () {
            $panel = new Panel(defaultSize: '40vh');

            expect($panel->flexStyle())->toBe('0 0 40vh');
        });

        it('falls back to using the raw value as a flex-basis for non-numeric keywords', function () {
            $panel = new Panel(defaultSize: 'auto');

            expect($panel->flexStyle())->toBe('1 1 auto');
        });

        it('supports decimal values with a unit', function () {
            $panel = new Panel(defaultSize: '12.5rem');

            expect($panel->flexStyle())->toBe('0 0 12.5rem');
        });
    });
});
