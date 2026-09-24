<?php

use WireKit\View\Components\Sidebar\Index;

describe('Sidebar\Index', function () {

    describe('defaults', function () {
        it('is not sticky by default', function () {
            $component = new Index();

            expect($component->sticky)->toBeFalse();
        });

        it('defaults the id to "sidebar"', function () {
            $component = new Index();

            expect($component->id)->toBe('sidebar');
        });

        it('is open by default', function () {
            $component = new Index();

            expect($component->open)->toBeTrue();
        });
    });

    describe('props', function () {
        it('can be made sticky', function () {
            $component = new Index(sticky: true);

            expect($component->sticky)->toBeTrue();
        });

        it('accepts a custom id', function () {
            $component = new Index(id: 'app-sidebar');

            expect($component->id)->toBe('app-sidebar');
        });

        it('can start closed', function () {
            $component = new Index(open: false);

            expect($component->open)->toBeFalse();
        });
    });
});
