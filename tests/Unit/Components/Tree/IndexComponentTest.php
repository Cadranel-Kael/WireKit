<?php

use WireKit\View\Components\Tree\Index;

describe('Tree\Index', function () {

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $tree = new Index(id: 'files');

            expect($tree->resolveId())->toBe('files');
        });

        it('falls back to the element wire:key so morphs keep the id stable', function () {
            $tree = new Index();

            expect($tree->resolveId('files'))->toBe('files');
        });

        it('prefers an explicit id over the wire:key', function () {
            $tree = new Index(id: 'explicit');

            expect($tree->resolveId('files'))->toBe('explicit');
        });

        it('falls back to a generated tree- id without an explicit id or wire:key', function () {
            $tree = new Index();

            expect($tree->resolveId())->toStartWith('tree-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('variantClass()', function () {
        it('resolves the file variant', function () {
            $tree = new Index(variant: 'file');

            expect($tree->variantClass())->toBe('gap-0.5');
        });

        it('falls back to an empty class for any other variant', function () {
            $tree = new Index(variant: 'list');

            expect($tree->variantClass())->toBe('');
        });
    });
});
