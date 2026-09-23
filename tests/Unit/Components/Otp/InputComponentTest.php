<?php

use WireKit\View\Components\Otp\Input;

describe('Otp\Input', function () {
    it('can be instantiated with no arguments', function () {
        expect(new Input())->toBeInstanceOf(Input::class);
    });
});
