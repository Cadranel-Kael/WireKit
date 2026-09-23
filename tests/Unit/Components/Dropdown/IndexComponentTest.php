<?php

use WireKit\View\Components\Dropdown\Index;

describe('Dropdown\Index', function () {

    describe('auto-generated dropdown id', function () {
        it('generates a non-empty dropdown id', function () {
            $dropdown = new Index();

            expect($dropdown->dropdownId)->toBeString()->not->toBeEmpty();
        });

        it('generates unique dropdown ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->dropdownId)->not->toBe($b->dropdownId);
        });
    });
});
