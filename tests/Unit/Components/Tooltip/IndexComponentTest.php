<?php

use WireKit\View\Components\Tooltip\Index;

describe('Tooltip\\Index', function () {

    describe('defaults', function () {
        it('has an empty content by default', function () {
            $tooltip = new Index();

            expect($tooltip->content)->toBe('');
        });

        it('defaults the offset to 4', function () {
            $tooltip = new Index();

            expect($tooltip->offset)->toBe('4');
        });

        it('defaults the placement to bottom', function () {
            $tooltip = new Index();

            expect($tooltip->placement)->toBe('bottom');
        });
    });

    describe('props', function () {
        it('accepts content, offset and placement together', function () {
            $tooltip = new Index(
                content: 'Copy to clipboard',
                offset: '8',
                placement: 'top',
            );

            expect($tooltip->content)->toBe('Copy to clipboard');
            expect($tooltip->offset)->toBe('8');
            expect($tooltip->placement)->toBe('top');
        });

        it('accepts an explicit id', function () {
            $tooltip = new Index(id: 'copy-tooltip');

            expect($tooltip->id)->toBe('copy-tooltip');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $tooltip = new Index(id: 'copy');

            expect($tooltip->resolveId())->toBe('copy');
        });

        it('falls back to the wire:key prefixed with tooltip- so morphs keep the id stable', function () {
            $tooltip = new Index();

            expect($tooltip->resolveId('copy'))->toBe('tooltip-copy');
        });

        it('prefers an explicit id over the wire:key', function () {
            $tooltip = new Index(id: 'explicit');

            expect($tooltip->resolveId('copy'))->toBe('explicit');
        });

        it('prefixes the fallback id with tooltip-', function () {
            $tooltip = new Index();

            expect($tooltip->resolveId())->toStartWith('tooltip-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });
});
