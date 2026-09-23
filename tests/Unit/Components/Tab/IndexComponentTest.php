<?php

use WireKit\View\Components\Tab\Index;

describe('Tab\Index', function () {

    describe('defaults', function () {
        it('has an empty icon by default', function () {
            $tab = new Index(name: 'general');

            expect($tab->icon)->toBe('');
        });
    });

    describe('props', function () {
        it('requires a name', function () {
            $tab = new Index(name: 'general');

            expect($tab->name)->toBe('general');
        });

        it('accepts an icon', function () {
            $tab = new Index(name: 'general', icon: 'cog');

            expect($tab->icon)->toBe('cog');
        });
    });
});
