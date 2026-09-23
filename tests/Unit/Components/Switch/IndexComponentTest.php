<?php

use WireKit\View\Components\Switch\Index;

describe('Switch\Index', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $switch = new Index();

            expect($switch->label)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a label', function () {
            $switch = new Index(label: 'Notifications');

            expect($switch->label)->toBe('Notifications');
        });
    });
});
