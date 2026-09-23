<?php

use WireKit\View\Components\Editor\Toolbar\Dropdown;

describe('Editor\Toolbar\Dropdown', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $dropdown = new Dropdown();

            expect($dropdown->label)->toBe('');
        });

        it('has no default icon by default', function () {
            $dropdown = new Dropdown();

            expect($dropdown->defaultIcon)->toBeNull();
        });
    });

    describe('props', function () {
        it('accepts a label and default icon', function () {
            $dropdown = new Dropdown(label: 'Styles', defaultIcon: 'heading');

            expect($dropdown->label)->toBe('Styles');
            expect($dropdown->defaultIcon)->toBe('heading');
        });
    });
});
