<?php

use WireKit\View\Components\Sidebar\Index;

describe('Sidebar\Index', function () {

    describe('defaults', function () {
        it('is not sticky by default', function () {
            $component = new Index();

            expect($component->sticky)->toBeFalse();
        });
    });

    describe('props', function () {
        it('can be made sticky', function () {
            $component = new Index(sticky: true);

            expect($component->sticky)->toBeTrue();
        });
    });
});
