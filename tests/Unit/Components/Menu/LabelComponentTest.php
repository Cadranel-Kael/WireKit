<?php

use WireKit\View\Components\Menu\Label;

describe('Menu\Label', function () {

    describe('defaults', function () {
        it('has an empty icon by default', function () {
            $label = new Label();

            expect($label->icon)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts an icon', function () {
            $label = new Label(icon: 'folder');

            expect($label->icon)->toBe('folder');
        });
    });

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $label = new Label();

            expect($label->id)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the id with item-', function () {
            $label = new Label();

            expect($label->id)->toStartWith('item-');
        });

        it('generates unique ids across instances', function () {
            $a = new Label();
            $b = new Label();

            expect($a->id)->not->toBe($b->id);
        });
    });
});
