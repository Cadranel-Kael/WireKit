<?php

use WireKit\View\Components\Label\Index;

describe('Label\Index', function () {

    describe('defaults', function () {
        it('renders as a label element by default', function () {
            $label = new Index();

            expect($label->as)->toBe('label');
        });
    });

    describe('props', function () {
        it('accepts a custom element tag', function () {
            $label = new Index(as: 'span');

            expect($label->as)->toBe('span');
        });
    });
});
