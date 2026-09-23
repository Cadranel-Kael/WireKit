<?php

use WireKit\View\Components\Modal\Index;

describe('Modal\Index', function () {

    describe('defaults', function () {
        it('has an empty name by default', function () {
            $modal = new Index();

            expect($modal->name)->toBe('');
        });

        it('is not a drawer by default', function () {
            $modal = new Index();

            expect($modal->drawer)->toBeFalse();
        });

        it('defaults to the right position', function () {
            $modal = new Index();

            expect($modal->position)->toBe('right');
        });
    });

    describe('props', function () {
        it('accepts a name', function () {
            $modal = new Index(name: 'confirm-delete');

            expect($modal->name)->toBe('confirm-delete');
        });

        it('can be marked as a drawer', function () {
            $modal = new Index(drawer: true);

            expect($modal->drawer)->toBeTrue();
        });

        it('accepts a position', function () {
            $modal = new Index(position: 'left');

            expect($modal->position)->toBe('left');
        });
    });

    describe('getPositionClasses()', function () {
        it('returns null when not a drawer, regardless of position', function () {
            $modal = new Index(drawer: false, position: 'right');

            expect($modal->getPositionClasses())->toBeNull();
        });

        it('returns slide-from-right classes for the right position', function () {
            $modal = new Index(drawer: true, position: 'right');

            expect($modal->getPositionClasses())->toContain('slide-from-right');
        });

        it('returns slide-from-left classes for the left position', function () {
            $modal = new Index(drawer: true, position: 'left');

            expect($modal->getPositionClasses())->toContain('slide-from-left');
        });

        it('returns slide-from-bottom classes for the bottom position', function () {
            $modal = new Index(drawer: true, position: 'bottom');

            expect($modal->getPositionClasses())->toContain('slide-from-bottom');
        });

        it('throws for an unsupported position when acting as a drawer', function () {
            $modal = new Index(drawer: true, position: 'top');

            expect(fn () => $modal->getPositionClasses())->toThrow(\UnhandledMatchError::class);
        });
    });
});
