<?php

use WireKit\View\Components\Editor\Button;

describe('Editor\Button', function () {

    describe('defaults', function () {
        it('has an empty icon by default', function () {
            $button = new Button();

            expect($button->icon)->toBe('');
        });

        it('has an empty label by default', function () {
            $button = new Button();

            expect($button->label)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts an icon and label', function () {
            $button = new Button(icon: 'bold', label: 'Bold');

            expect($button->icon)->toBe('bold');
            expect($button->label)->toBe('Bold');
        });
    });
});
