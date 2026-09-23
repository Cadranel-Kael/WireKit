<?php

use WireKit\View\Components\Tooltip\Index;

describe('Tooltip\Index', function () {

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
    });

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $tooltip = new Index();

            expect($tooltip->id)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the id with tooltip-', function () {
            $tooltip = new Index();

            expect($tooltip->id)->toStartWith('tooltip-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->id)->not->toBe($b->id);
        });
    });
});
