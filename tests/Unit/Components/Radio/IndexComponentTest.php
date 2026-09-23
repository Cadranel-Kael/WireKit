<?php

use WireKit\View\Components\Radio\Index;

describe('Radio\Index', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $radio = new Index();

            expect($radio->label)->toBe('');
        });

        it('is not required by default', function () {
            $radio = new Index();

            expect($radio->required)->toBeFalse();
        });
    });

    describe('props', function () {
        it('accepts a label and required flag', function () {
            $radio = new Index(label: 'Yes', required: true);

            expect($radio->label)->toBe('Yes');
            expect($radio->required)->toBeTrue();
        });
    });

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $radio = new Index();

            expect($radio->id)->not->toBeEmpty();
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->id)->not->toBe($b->id);
        });
    });
});
