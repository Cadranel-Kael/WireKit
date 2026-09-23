<?php

use WireKit\View\Components\Alert\Index;

describe('Alert\Index', function () {
    describe('defaults', function () {
        it('has empty variant, color, icon, heading and description by default', function () {
            $alert = new Index();

            expect($alert->variant)->toBe('');
            expect($alert->color)->toBe('');
            expect($alert->icon)->toBe('');
            expect($alert->heading)->toBe('');
            expect($alert->description)->toBe('');
        });

        it('is not inline by default', function () {
            $alert = new Index();

            expect($alert->inline)->toBeFalse();
        });

        it('leaves descriptionClass empty when no variant is given', function () {
            $alert = new Index();

            expect($alert->descriptionClass)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts all props together', function () {
            $alert = new Index(
                variant: 'success',
                color: 'green',
                icon: 'circle-check',
                iconVariant: 'solid',
                controls: 'dismiss',
                actions: 'retry',
                inline: true,
                heading: 'All good',
                description: 'Everything worked.',
            );

            expect($alert->variant)->toBe('success');
            expect($alert->color)->toBe('green');
            expect($alert->icon)->toBe('circle-check');
            expect($alert->iconVariant)->toBe('solid');
            expect($alert->controls)->toBe('dismiss');
            expect($alert->actions)->toBe('retry');
            expect($alert->inline)->toBeTrue();
            expect($alert->heading)->toBe('All good');
            expect($alert->description)->toBe('Everything worked.');
        });
    });

    describe('variant()', function () {
        it('sets success color and description classes', function () {
            $alert = new Index(variant: 'success');

            expect($alert->colorClass)->toBe('bg-green-100 text-green-800');
            expect($alert->descriptionClass)->toBe('text-green-700');
        });

        it('sets danger color and description classes', function () {
            $alert = new Index(variant: 'danger');

            expect($alert->colorClass)->toBe('bg-red-100 text-red-800');
            expect($alert->descriptionClass)->toBe('text-red-700');
        });

        it('sets warning color and description classes', function () {
            $alert = new Index(variant: 'warning');

            expect($alert->colorClass)->toBe('bg-orange-100 text-orange-800');
            expect($alert->descriptionClass)->toBe('text-orange-700');
        });

        it('falls back to empty classes for an unknown variant', function () {
            $alert = new Index(variant: 'mystery');

            expect($alert->colorClass)->toBe('');
            expect($alert->descriptionClass)->toBe('');
        });

        it('does not override the color-derived class when no variant is given', function () {
            $alert = new Index(color: 'red');

            expect($alert->colorClass)->not->toBe('');
        });
    });
});
