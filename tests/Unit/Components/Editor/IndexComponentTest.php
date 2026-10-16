<?php

use WireKit\View\Components\Editor\Index;

describe('Editor\\Index', function () {

    describe('defaults', function () {
        it('has an empty toolbar by default', function () {
            $editor = new Index();

            expect($editor->toolbar)->toBe('');
        });

        it('has an empty label by default', function () {
            $editor = new Index();

            expect($editor->label)->toBe('');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $editor = new Index(id: 'bio');

            expect($editor->resolveId())->toBe('bio');
        });

        it('falls back to the wire:key prefixed with editor- so morphs keep the id stable', function () {
            $editor = new Index();

            expect($editor->resolveId('bio'))->toBe('editor-bio');
        });

        it('prefers an explicit id over the wire:key', function () {
            $editor = new Index(id: 'explicit');

            expect($editor->resolveId('bio'))->toBe('explicit');
        });

        it('prefixes the fallback id with editor-', function () {
            $editor = new Index();

            expect($editor->resolveId())->toStartWith('editor-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('toolbarItems()', function () {
        it('splits a space-separated toolbar string into items', function () {
            $editor = new Index(toolbar: 'bold italic underline');

            expect($editor->toolbarItems())->toBe(['bold', 'italic', 'underline']);
        });

        it('converts | into a separator item', function () {
            $editor = new Index(toolbar: 'bold | italic');

            expect($editor->toolbarItems())->toBe(['bold', 'separator', 'italic']);
        });

        it('converts - into a spacer item', function () {
            $editor = new Index(toolbar: 'bold - italic');

            expect($editor->toolbarItems())->toBe(['bold', 'spacer', 'italic']);
        });

        it('handles separators and spacers together', function () {
            $editor = new Index(toolbar: 'bold italic | bullet ordered - undo redo');

            expect($editor->toolbarItems())->toBe([
                'bold', 'italic', 'separator', 'bullet', 'ordered', 'spacer', 'undo', 'redo',
            ]);
        });

        it('returns a single empty-string item for an empty toolbar', function () {
            $editor = new Index(toolbar: '');

            expect($editor->toolbarItems())->toBe(['']);
        });
    });
});
