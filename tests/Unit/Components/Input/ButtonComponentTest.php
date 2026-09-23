<?php

use WireKit\View\Components\Input\Button;

describe('Input\Button', function () {

    describe('defaults', function () {
        it('is not clearable, revealable or copyable by default', function () {
            $button = new Button();

            expect($button->clearable)->toBeFalse();
            expect($button->revealable)->toBeFalse();
            expect($button->copyable)->toBeFalse();
        });
    });

    describe('props', function () {
        it('accepts clearable, revealable and copyable', function () {
            $button = new Button(clearable: true, revealable: true, copyable: true);

            expect($button->clearable)->toBeTrue();
            expect($button->revealable)->toBeTrue();
            expect($button->copyable)->toBeTrue();
        });
    });
});
