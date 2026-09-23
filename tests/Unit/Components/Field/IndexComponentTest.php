<?php

use Illuminate\View\ComponentAttributeBag;
use WireKit\View\Components\Field\Index;

describe('Field\Index', function () {

    describe('defaults', function () {
        it('defaults to a block display', function () {
            $field = new Index();

            expect($field->display)->toBe('block');
        });
    });

    describe('auto-generated ids', function () {
        it('generates a non-empty labelId when none is given', function () {
            $field = new Index();

            expect($field->labelId)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the generated labelId with label-', function () {
            $field = new Index();

            expect($field->labelId)->toStartWith('label-');
        });

        it('generates a non-empty descriptionId when none is given', function () {
            $field = new Index();

            expect($field->descriptionId)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the generated descriptionId with description-', function () {
            $field = new Index();

            expect($field->descriptionId)->toStartWith('description-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->labelId)->not->toBe($b->labelId);
            expect($a->descriptionId)->not->toBe($b->descriptionId);
        });

        it('uses the given labelId and descriptionId instead of generating them', function () {
            $field = new Index(labelId: 'my-label', descriptionId: 'my-description');

            expect($field->labelId)->toBe('my-label');
            expect($field->descriptionId)->toBe('my-description');
        });
    });

    describe('props', function () {
        it('accepts a display value', function () {
            $field = new Index(display: 'inline');

            expect($field->display)->toBe('inline');
        });
    });

    describe('descriptionPosition()', function () {
        it('returns the description:position attribute when present', function () {
            $field = new Index();
            $attributes = new ComponentAttributeBag(['description:position' => 'inline']);

            expect($field->descriptionPosition($attributes))->toBe('inline');
        });

        it('defaults to an empty string', function () {
            $field = new Index();
            $attributes = new ComponentAttributeBag();

            expect($field->descriptionPosition($attributes))->toBe('');
        });
    });
});
