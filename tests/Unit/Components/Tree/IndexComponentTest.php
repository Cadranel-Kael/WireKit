<?php

use WireKit\View\Components\Tree\Index;

describe('Tree\Index', function () {

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $tree = new Index();

            expect($tree->id)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the id with tree-', function () {
            $tree = new Index();

            expect($tree->id)->toStartWith('tree-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->id)->not->toBe($b->id);
        });
    });
});
