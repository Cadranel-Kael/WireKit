<?php

use Illuminate\View\ComponentAttributeBag;
use WireKit\View\Components\Field\Index;

describe('Field\\Index', function () {

    describe('defaults', function () {
        it('defaults to a block display', function () {
            $field = new Index();

            expect($field->display)->toBe('block');
        });
    });

    describe('resolveIds()', function () {
        it('prefers explicit ids', function () {
            $field = new Index(labelId: 'my-label', descriptionId: 'my-description');

            $ids = $field->resolveIds();

            expect($ids['labelId'])->toBe('my-label');
            expect($ids['descriptionId'])->toBe('my-description');
        });

        it('falls back to the wire:key with prefixed suffixes so morphs keep the ids stable', function () {
            $field = new Index();

            $ids = $field->resolveIds('email');

            expect($ids['labelId'])->toBe('label-email');
            expect($ids['descriptionId'])->toBe('description-email');
        });

        it('prefers explicit ids over the wire:key', function () {
            $field = new Index(labelId: 'explicit');

            $ids = $field->resolveIds('email');

            expect($ids['labelId'])->toBe('explicit');
            expect($ids['descriptionId'])->toBe('description-email');
        });

        it('prefixes the fallback ids', function () {
            $field = new Index();

            $ids = $field->resolveIds();

            expect($ids['labelId'])->toStartWith('label-');
            expect($ids['descriptionId'])->toStartWith('description-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            $idsA = $a->resolveIds();
            $idsB = $b->resolveIds();

            expect($idsA['labelId'])->not->toBe($idsB['labelId']);
            expect($idsA['descriptionId'])->not->toBe($idsB['descriptionId']);
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
