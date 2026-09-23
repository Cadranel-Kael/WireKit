<?php

use WireKit\View\Components\Editor\Index;

describe('Editor\Index', function () {

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

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $editor = new Index();

            expect($editor->id)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the id with editor-', function () {
            $editor = new Index();

            expect($editor->id)->toStartWith('editor-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->id)->not->toBe($b->id);
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
