<?php

use WireKit\View\Components\Otp\Index;

describe('Otp\Index', function () {

    describe('defaults', function () {
        it('has a default length of 6', function () {
            $otp = new Index();

            expect($otp->length)->toBe(6);
        });

        it('has an empty label by default', function () {
            $otp = new Index();

            expect($otp->label)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts a custom length and label', function () {
            $otp = new Index(length: 4, label: 'Verification code');

            expect($otp->length)->toBe(4);
            expect($otp->label)->toBe('Verification code');
        });
    });
});
