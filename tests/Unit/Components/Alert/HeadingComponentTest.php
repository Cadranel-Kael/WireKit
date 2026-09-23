<?php

use WireKit\View\Components\Alert\Heading;

describe('Alert\Heading', function () {
    describe('defaults', function () {
        it('has an empty icon by default', function () {
            $heading = new Heading();

            expect($heading->icon)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts an icon', function () {
            $heading = new Heading(icon: 'triangle-alert');

            expect($heading->icon)->toBe('triangle-alert');
        });
    });
});
