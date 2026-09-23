<?php

use WireKit\View\Components\Textarea\Textarea;

describe('Textarea\Textarea', function () {

    describe('defaults', function () {
        it('has no disabled state by default', function () {
            $textarea = new Textarea();

            expect($textarea->disabled)->toBeNull();
        });
    });

    describe('props', function () {
        it('accepts a disabled state', function () {
            $textarea = new Textarea(disabled: true);

            expect($textarea->disabled)->toBeTrue();
        });
    });
});
