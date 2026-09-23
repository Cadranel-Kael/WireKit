<?php

use WireKit\View\Components\Toast\Index;

describe('Toast\Index', function () {

    describe('defaults', function () {
        it('has a default placement of bottom end', function () {
            $toast = new Index();

            expect($toast->placement)->toBe('bottom end');
        });

        it('has a default max of 3', function () {
            $toast = new Index();

            expect($toast->max)->toBe(3);
        });

        it('has an empty heading by default', function () {
            $toast = new Index();

            expect($toast->heading)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a custom placement, max and heading', function () {
            $toast = new Index(placement: 'top start', max: 5, heading: 'Notice');

            expect($toast->placement)->toBe('top start');
            expect($toast->max)->toBe(5);
            expect($toast->heading)->toBe('Notice');
        });
    });

    describe('resolvePlacement()', function () {
        it('adds mr-auto for a start placement', function () {
            $toast = new Index(placement: 'top start');

            expect($toast->resolvePlacement())->toContain('mr-auto');
        });

        it('adds ml-auto for an end placement', function () {
            $toast = new Index(placement: 'top end');

            expect($toast->resolvePlacement())->toContain('ml-auto');
        });

        it('adds mb-auto for a top placement', function () {
            $toast = new Index(placement: 'top end');

            expect($toast->resolvePlacement())->toContain('mb-auto');
        });

        it('adds mt-auto for a bottom placement', function () {
            $toast = new Index(placement: 'bottom end');

            expect($toast->resolvePlacement())->toContain('mt-auto');
        });

        it('adds mx-auto for a center placement', function () {
            $toast = new Index(placement: 'center');

            expect($toast->resolvePlacement())->toContain('mx-auto');
        });

        it('combines classes for compound placements', function () {
            $toast = new Index(placement: 'bottom end');

            expect($toast->resolvePlacement())->toBe(' ml-auto mt-auto');
        });
    });

    describe('resolveDirection()', function () {
        it('animates from the bottom when placed at the top', function () {
            $toast = new Index(placement: 'top end');

            expect($toast->resolveDirection())->toBe('bottom');
        });

        it('animates from the top when placed at the bottom', function () {
            $toast = new Index(placement: 'bottom end');

            expect($toast->resolveDirection())->toBe('top');
        });
    });
});
