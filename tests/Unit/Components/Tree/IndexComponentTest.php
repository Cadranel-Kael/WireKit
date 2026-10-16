<?php

use WireKit\View\Components\Tree\Index;

describe('Tree\Index', function () {

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $tree = new Index(id: 'files');

            expect($tree->resolveId())->toBe('files');
        });

        it('prefixes the element wire:key so bare keys cannot collide across trees', function () {
            $tree = new Index();

            expect($tree->resolveId('files'))->toBe('tree-files');
        });

        it('prefixes a bare numeric wire:key to avoid duplicate DOM ids', function () {
            $tree = new Index();

            expect($tree->resolveId('3'))->toBe('tree-3');
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
