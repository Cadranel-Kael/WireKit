<?php

use Illuminate\View\ComponentAttributeBag;
use WireKit\View\Components\Checkbox\Index;

describe('Checkbox\Index', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $checkbox = new Index();

            expect($checkbox->label)->toBe('');
        });

        it('has an empty description by default', function () {
            $checkbox = new Index();

            expect($checkbox->description)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a label and description', function () {
            $checkbox = new Index(label: 'Accept terms', description: 'You must accept to continue');

            expect($checkbox->label)->toBe('Accept terms');
            expect($checkbox->description)->toBe('You must accept to continue');
        });
    });

    describe('labelClasses()', function () {
        it('returns the label:class attribute when present', function () {
            $checkbox = new Index();
            $attributes = new ComponentAttributeBag(['label:class' => 'font-bold']);

            expect($checkbox->labelClasses($attributes))->toBe('font-bold');
        });

        it('defaults to an empty string', function () {
            $checkbox = new Index();
            $attributes = new ComponentAttributeBag();

            expect($checkbox->labelClasses($attributes))->toBe('');
        });
    });

    describe('descriptionClasses()', function () {
        it('returns the description:class attribute when present', function () {
            $checkbox = new Index();
            $attributes = new ComponentAttributeBag(['description:class' => 'text-sm']);

            expect($checkbox->descriptionClasses($attributes))->toBe('text-sm');
        });

        it('defaults to an empty string', function () {
            $checkbox = new Index();
            $attributes = new ComponentAttributeBag();

            expect($checkbox->descriptionClasses($attributes))->toBe('');
        });
    });

    describe('descriptionPosition()', function () {
        it('returns the description:position attribute when present', function () {
            $checkbox = new Index();
            $attributes = new ComponentAttributeBag(['description:position' => 'inline']);

            expect($checkbox->descriptionPosition($attributes))->toBe('inline');
        });

        it('defaults to block', function () {
            $checkbox = new Index();
            $attributes = new ComponentAttributeBag();

            expect($checkbox->descriptionPosition($attributes))->toBe('block');
        });
    });
});
