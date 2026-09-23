<?php

use WireKit\View\Components\Drawer\Index;

describe('Drawer\Index', function () {
    describe('defaults', function () {
        it('has a null id when none is given', function () {
            $drawer = new Index();

            expect($drawer->id)->toBeNull();
        });
    });

    describe('props', function () {
        it('accepts an explicit id', function () {
            $drawer = new Index(id: 'settings-drawer');

            expect($drawer->id)->toBe('settings-drawer');
        });
    });
});
