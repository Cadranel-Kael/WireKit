<?php

use WireKit\View\Components\Tree\Item;

describe('Tree\Item', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $item = new Item();

            expect($item->label)->toBe('');
        });

        it('has an empty icon by default', function () {
            $item = new Item();

            expect($item->icon)->toBe('');
        });

        it('is collapsed by default', function () {
            $item = new Item();

            expect($item->expanded)->toBeFalse();
        });

        it('is enabled by default', function () {
            $item = new Item();

            expect($item->disabled)->toBeFalse();
        });

        it('has no href by default', function () {
            $item = new Item();

            expect($item->href)->toBeNull();
        });

        it('is draggable by default', function () {
            $item = new Item();

            expect($item->draggable)->toBeTrue();
        });
    });

    describe('props', function () {
        it('accepts a label, icon, expanded, disabled, draggable and href', function () {
            $item = new Item(
                label: 'src',
                icon: 'folder',
                expanded: true,
                disabled: true,
                draggable: false,
                href: '/src',
            );

            expect($item->label)->toBe('src');
            expect($item->icon)->toBe('folder');
            expect($item->expanded)->toBeTrue();
            expect($item->disabled)->toBeTrue();
            expect($item->draggable)->toBeFalse();
            expect($item->href)->toBe('/src');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $item = new Item(id: 'src');

            expect($item->resolveId())->toBe('src');
        });

        it('falls back to the element wire:key so morphs keep the id stable', function () {
            $item = new Item();

            expect($item->resolveId('item-1'))->toBe('item-1');
        });

        it('prefers an explicit id over the wire:key', function () {
            $item = new Item(id: 'explicit');

            expect($item->resolveId('item-1'))->toBe('explicit');
        });

        it('falls back to a generated tree-item- id without an explicit id or wire:key', function () {
            $item = new Item();

            expect($item->resolveId())->toStartWith('tree-item-');
        });

        it('generates unique ids across instances', function () {
            $a = new Item();
            $b = new Item();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('rowClass()', function () {
        it('resolves the list variant', function () {
            $item = new Item();

            expect($item->rowClass('list', false))
                ->toBe('bg-background border-background rounded-xl border px-4 py-2.5 shadow-sm first:mt-px');
        });

        it('adds dragging classes for a sortable list', function () {
            $item = new Item();

            expect($item->rowClass('list', true))->toBe(
                'bg-background border-background rounded-xl border px-4 py-2.5 shadow-sm first:mt-px '
                . 'dragging:border-primary dragging:bg-primary/50 dragging:*:opacity-0 dragging:border-dashed relative pr-2.5 pl-1.5'
            );
        });

        it('resolves the file variant', function () {
            $item = new Item();

            expect($item->rowClass('file', false))->toBe('text-muted-foreground hover:bg-muted');
        });

        it('falls back to an empty class for any other variant', function () {
            $item = new Item();

            expect($item->rowClass('mystery', false))->toBe('');
        });
    });

    describe('groupClass()', function () {
        it('resolves the file variant', function () {
            $item = new Item();

            expect($item->groupClass('file'))->toBe('border-border ml-2 border-l pl-2');
        });

        it('resolves the list variant', function () {
            $item = new Item();

            expect($item->groupClass('list'))->toBe('ml-4 [&>*:first-child>*]:rounded-tl-none');
        });

        it('falls back to ml-4 for any other variant', function () {
            $item = new Item();

            expect($item->groupClass('mystery'))->toBe('ml-4');
        });
    });
});
