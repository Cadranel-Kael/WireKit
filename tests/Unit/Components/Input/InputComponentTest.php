<?php

use WireKit\View\Components\Input\Input;

describe('Input\Input', function () {

    describe('defaults', function () {
        it('has no icon by default', function () {
            $input = new Input();

            expect($input->icon)->toBeNull();
        });

        it('has no left icon by default', function () {
            $input = new Input();

            expect($input->leftIcon)->toBeNull();
        });
    });

    describe('props', function () {
        it('accepts an icon and leftIcon', function () {
            $input = new Input(icon: 'check', leftIcon: 'search');

            expect($input->icon)->toBe('check');
            expect($input->leftIcon)->toBe('search');
        });
    });
});
