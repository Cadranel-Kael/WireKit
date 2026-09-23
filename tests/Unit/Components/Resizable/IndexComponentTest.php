<?php

use WireKit\View\Components\Resizable\Index;

describe('Resizable\Index', function () {

    describe('defaults', function () {
        it('is horizontal by default', function () {
            $component = new Index();

            expect($component->orientation)->toBe('horizontal');
        });
    });

    describe('props', function () {
        it('accepts a vertical orientation', function () {
            $component = new Index(orientation: 'vertical');

            expect($component->orientation)->toBe('vertical');
        });
    });
});
