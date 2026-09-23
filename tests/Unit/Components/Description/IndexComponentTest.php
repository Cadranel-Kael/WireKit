<?php

use WireKit\View\Components\Description\Index;

describe('Description\Index', function () {

    describe('defaults', function () {
        it('positions before by default', function () {
            $component = new Index();

            expect($component->position)->toBe('before');
        });
    });

    describe('props', function () {
        it('accepts an after position', function () {
            $component = new Index(position: 'after');

            expect($component->position)->toBe('after');
        });
    });
});
