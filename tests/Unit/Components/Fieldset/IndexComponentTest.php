<?php

use WireKit\View\Components\Fieldset\Index;

describe('Fieldset\Index', function () {
    it('constructs without arguments', function () {
        expect(new Index())->toBeInstanceOf(Index::class);
    });

    describe('variantClass()', function () {
        it('resolves the card variant', function () {
            $fieldset = new Index(variant: 'card');

            expect($fieldset->variantClass())->toBe('border-border bg-muted/40 block rounded-xl border');
        });

        it('falls back to an empty class for any other variant', function () {
            $fieldset = new Index();

            expect($fieldset->variantClass())->toBe('');
        });
    });

    describe('fieldsClass()', function () {
        it('resolves the card variant', function () {
            $fieldset = new Index(variant: 'card');

            expect($fieldset->fieldsClass())->toBe('bg-card ring-border rounded-xl px-4 py-2 ring-1');
        });

        it('falls back to an empty class for any other variant', function () {
            $fieldset = new Index();

            expect($fieldset->fieldsClass())->toBe('');
        });
    });
});
