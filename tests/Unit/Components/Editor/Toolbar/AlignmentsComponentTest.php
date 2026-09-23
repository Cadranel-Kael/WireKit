<?php

use WireKit\View\Components\Editor\Toolbar\Alignments;

describe('Editor\Toolbar\Alignments', function () {

    describe('defaults', function () {
        it('defaults to left, center and right alignments', function () {
            $alignments = new Alignments();

            expect($alignments->alignments)->toBe(['left', 'center', 'right']);
        });
    });

    describe('props', function () {
        it('accepts a custom alignments array', function () {
            $alignments = new Alignments(alignments: ['left', 'justify']);

            expect($alignments->alignments)->toBe(['left', 'justify']);
        });
    });

    describe('resolveIcon()', function () {
        it('resolves the left icon', function () {
            $alignments = new Alignments();

            expect($alignments->resolveIcon('left'))->toBe('text-align-start');
        });

        it('resolves the center icon', function () {
            $alignments = new Alignments();

            expect($alignments->resolveIcon('center'))->toBe('text-align-center');
        });

        it('resolves the right icon', function () {
            $alignments = new Alignments();

            expect($alignments->resolveIcon('right'))->toBe('text-align-end');
        });

        it('resolves the justify icon', function () {
            $alignments = new Alignments();

            expect($alignments->resolveIcon('justify'))->toBe('text-align-justify');
        });
    });
});
