<?php

use WireKit\View\Components\Currency\Index;

describe('Currency\Index', function () {

    describe('defaults', function () {
        it('defaults to USD, en_US and 0.00', function () {
            $currency = new Index();

            expect($currency->currency)->toBe('USD');
            expect($currency->locale)->toBe('en_US');
            expect($currency->value)->toBe('0.00');
        });

        it('formats the default value as $0.00', function () {
            $currency = new Index();

            expect($currency->formatedValue)->toBe('$0.00');
        });
    });

    describe('props', function () {
        it('accepts currency, locale and value', function () {
            $currency = new Index(currency: 'EUR', locale: 'de_DE', value: '1234.56');

            expect($currency->currency)->toBe('EUR');
            expect($currency->locale)->toBe('de_DE');
            expect($currency->value)->toBe('1234.56');
        });
    });

    describe('formatedValue', function () {
        it('formats a USD value with thousands separators', function () {
            $currency = new Index(value: '1234.56');

            expect($currency->formatedValue)->toBe('$1,234.56');
        });

        it('formats using the given currency code', function () {
            $currency = new Index(currency: 'GBP', value: '10.00');

            expect($currency->formatedValue)->toContain('10.00');
            expect($currency->formatedValue)->toContain('£');
        });
    });
});
