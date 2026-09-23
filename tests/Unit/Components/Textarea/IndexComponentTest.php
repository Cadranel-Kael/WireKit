<?php

use WireKit\View\Components\Textarea\Index;

describe('Textarea\Index', function () {

    describe('defaults', function () {
        it('has no label by default', function () {
            $textarea = new Index();

            expect($textarea->label)->toBeNull();
        });

        it('has no description by default', function () {
            $textarea = new Index();

            expect($textarea->description)->toBeNull();
        });

        it('has no disabled state by default', function () {
            $textarea = new Index();

            expect($textarea->disabled)->toBeNull();
        });
    });

    describe('props', function () {
        it('accepts label, description and disabled', function () {
            $textarea = new Index(label: 'Bio', description: 'Tell us about yourself', disabled: true);

            expect($textarea->label)->toBe('Bio');
            expect($textarea->description)->toBe('Tell us about yourself');
            expect($textarea->disabled)->toBeTrue();
        });
    });
});
