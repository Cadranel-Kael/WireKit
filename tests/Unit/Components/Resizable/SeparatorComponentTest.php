<?php

use WireKit\View\Components\Resizable\Separator;

describe('Resizable\Separator', function () {

    describe('defaults', function () {
        it('is horizontal by default', function () {
            $component = new Separator();

            expect($component->orientation)->toBe('horizontal');
        });
    });

    describe('props', function () {
        it('accepts a vertical orientation', function () {
            $component = new Separator(orientation: 'vertical');

            expect($component->orientation)->toBe('vertical');
        });
    });
});
