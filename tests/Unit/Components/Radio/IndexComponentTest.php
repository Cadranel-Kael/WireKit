<?php

use WireKit\View\Components\Radio\Index;

describe('Radio\\Index', function () {

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

        it('accepts an explicit id', function () {
            $radio = new Index(id: 'agree');

            expect($radio->id)->toBe('agree');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $radio = new Index(id: 'agree');

            expect($radio->resolveId())->toBe('agree');
        });

        it('falls back to the wire:key prefixed with radio- so morphs keep the id stable', function () {
            $radio = new Index();

            expect($radio->resolveId('agree'))->toBe('radio-agree');
        });

        it('prefers an explicit id over the wire:key', function () {
            $radio = new Index(id: 'explicit');

            expect($radio->resolveId('agree'))->toBe('explicit');
        });

        it('prefixes the fallback id with radio-', function () {
            $radio = new Index();

            expect($radio->resolveId())->toStartWith('radio-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });
});
