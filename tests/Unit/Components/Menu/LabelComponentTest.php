<?php

use WireKit\View\Components\Menu\Label;

describe('Menu\\Label', function () {

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

        it('accepts an explicit id', function () {
            $label = new Label(id: 'section');

            expect($label->id)->toBe('section');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $label = new Label(id: 'section');

            expect($label->resolveId())->toBe('section');
        });

        it('falls back to the wire:key prefixed with menu-label- so morphs keep the id stable', function () {
            $label = new Label();

            expect($label->resolveId('section'))->toBe('menu-label-section');
        });

        it('prefers an explicit id over the wire:key', function () {
            $label = new Label(id: 'explicit');

            expect($label->resolveId('section'))->toBe('explicit');
        });

        it('prefixes the fallback id with menu-label-', function () {
            $label = new Label();

            expect($label->resolveId())->toStartWith('menu-label-');
        });

        it('generates unique ids across instances', function () {
            $a = new Label();
            $b = new Label();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });
});
