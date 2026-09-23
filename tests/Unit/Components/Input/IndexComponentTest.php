<?php

use WireKit\View\Components\Input\Index;

describe('Input\Index', function () {

    describe('defaults', function () {
        it('has no label by default', function () {
            $input = new Index();

            expect($input->label)->toBeNull();
        });

        it('has no description by default', function () {
            $input = new Index();

            expect($input->description)->toBeNull();
        });

        it('has no size by default', function () {
            $input = new Index();

            expect($input->size)->toBeNull();
        });

        it('has an empty icon by default', function () {
            $input = new Index();

            expect($input->icon)->toBe('');
        });

        it('has an empty prefix and suffix by default', function () {
            $input = new Index();

            expect($input->prefix)->toBe('');
            expect($input->suffix)->toBe('');
        });

        it('has an empty error by default', function () {
            $input = new Index();

            expect($input->error)->toBe('');
        });

        it('is not clearable, revealable or copyable by default', function () {
            $input = new Index();

            expect($input->clearable)->toBeFalse();
            expect($input->revealable)->toBeFalse();
            expect($input->copyable)->toBeFalse();
        });
    });

    describe('props', function () {
        it('accepts all props', function () {
            $input = new Index(
                label: 'Email',
                description: 'Your email address',
                size: 'sm',
                icon: 'mail',
                prefix: 'https://',
                suffix: '.com',
                error: 'Required',
                clearable: true,
                revealable: true,
                copyable: true,
                iconAfter: 'check',
            );

            expect($input->label)->toBe('Email');
            expect($input->description)->toBe('Your email address');
            expect($input->size)->toBe('sm');
            expect($input->icon)->toBe('mail');
            expect($input->prefix)->toBe('https://');
            expect($input->suffix)->toBe('.com');
            expect($input->error)->toBe('Required');
            expect($input->clearable)->toBeTrue();
            expect($input->revealable)->toBeTrue();
            expect($input->copyable)->toBeTrue();
            expect($input->iconAfter)->toBe('check');
        });
    });

    describe('sizeClass()', function () {
        it('returns compact padding for sm', function () {
            $input = new Index(size: 'sm');

            expect($input->sizeClass())->toBe('px-2 py-1');
        });

        it('returns default padding for null size', function () {
            $input = new Index();

            expect($input->sizeClass())->toBe('px-3 py-2');
        });

        it('returns default padding for an unrecognised size', function () {
            $input = new Index(size: 'lg');

            expect($input->sizeClass())->toBe('px-3 py-2');
        });
    });

    describe('resolvedName()', function () {
        it('returns the name attribute when present', function () {
            $input = new Index();
            $input->withAttributes(['name' => 'email']);

            expect($input->resolvedName())->toBe('email');
        });

        it('falls back to a wire:model attribute', function () {
            $input = new Index();
            $input->withAttributes(['wire:model' => 'form.email']);

            expect($input->resolvedName())->toBe('form.email');
        });

        it('falls back to a scoped wire:model.live attribute', function () {
            $input = new Index();
            $input->withAttributes(['wire:model.live' => 'form.email']);

            expect($input->resolvedName())->toBe('form.email');
        });

        it('prefers name over wire:model when both are present', function () {
            $input = new Index();
            $input->withAttributes(['name' => 'email', 'wire:model' => 'form.email']);

            expect($input->resolvedName())->toBe('email');
        });

        it('returns null when neither name nor wire:model is present', function () {
            $input = new Index();
            $input->withAttributes(['class' => 'foo']);

            expect($input->resolvedName())->toBeNull();
        });
    });
});
